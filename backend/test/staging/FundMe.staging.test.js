const { assert } = require("chai");
const { network, getNamedAccounts, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe;
      let deployer;
      const ethVal = ethers.utils.parseUnits("0.05", "ether");

      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deployer); // assuming that the contract is already deployed
      });

      it("Allows people to fund and withdraw", async function () {
        await fundMe.fund({ value: ethVal });
        await fundMe.withdraw();
        const eContractBal = await fundMe.provider.getBalance(fundMe.address);
        assert.equal(eContractBal.toString(), "0");
      });
    });
