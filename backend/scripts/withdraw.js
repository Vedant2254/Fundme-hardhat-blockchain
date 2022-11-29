const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", deployer);

  console.log("Withdrawing the funds ...");

  const txRes = await fundMe.withdraw();
  const txReciept = txRes.wait(1);

  console.log("Withdrawing was successful");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    throw err;
  });
