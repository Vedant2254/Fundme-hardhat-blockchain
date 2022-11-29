const { assert, expect } = require("chai");
const { network } = require("hardhat");
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe;
      let deployer;
      let mockV3Aggregator;
      const ethVal = ethers.utils.parseUnits("1", "ether");

      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]); // runs the deployment scripts that has "all" tag
        fundMe = await ethers.getContract("FundMe", deployer);
        mockV3Aggregator = await ethers.getContract(
          "MockV3Aggregator",
          deployer
        );
      });

      describe("constructor", async function () {
        it("Sets the aggregator address correctly", async function () {
          const response = await fundMe.getPriceFeed();
          assert.equal(response, mockV3Aggregator.address);
        });
      });

      describe("fund", async function () {
        it("Fails if you don't send enough ETH", async function () {
          await expect(fundMe.fund()).to.be.revertedWith(
            "Didn't send enough ETH"
          );
        });
        it("Correctly updates mapping of funders to funds", async function () {
          const pFunds = await fundMe.getAddressToFund(deployer);
          await fundMe.fund({ value: ethVal });
          const cFunds = await fundMe.getAddressToFund(deployer);
          assert.equal(cFunds.toString(), pFunds.add(ethVal).toString());
        });
      });

      describe("withdraw", async function () {
        beforeEach(async function () {
          await fundMe.fund({ value: ethVal });
        });

        it("Withdrawing from contract works correctly", async function () {
          // Arrange
          const sContractBal = await fundMe.provider.getBalance(fundMe.address);
          const sDeployerBal = await fundMe.provider.getBalance(deployer);

          // Act
          const txRes = await fundMe.withdraw();
          const txReciept = await txRes.wait(1);
          const eContractBal = await fundMe.provider.getBalance(fundMe.address);
          const eDeployerBal = await fundMe.provider.getBalance(deployer);

          const { gasUsed, effectiveGasPrice } = txReciept;
          const gasCost = gasUsed.mul(effectiveGasPrice);

          // Assert
          assert.equal(eContractBal, 0);
          assert.equal(
            eDeployerBal.toString(),
            sDeployerBal.add(sContractBal).sub(gasCost).toString()
          );
        });

        it("Only allows the owner to withdraw", async function () {
          const accounts = await ethers.getSigners();
          const attacker = accounts[1];
          const attackerConnectedContract = await fundMe.connect(attacker);
          await expect(attackerConnectedContract.withdraw()).to.be.reverted;
        });
      });
    });
