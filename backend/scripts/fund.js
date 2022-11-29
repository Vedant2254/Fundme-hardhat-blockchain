const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", deployer);

  console.log("Funding 0.05 ETH to FundMe contract ...");

  const txRes = await fundMe.fund({
    value: ethers.utils.parseEther("0.05"),
  });
  const txReciept = txRes.wait(1);

  console.log("Funded 0.05 ETH!");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    throw err;
  });
