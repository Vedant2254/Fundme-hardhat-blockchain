const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

// hre or hardhat is passed as argument to this function, we destructure what we want from it
// here we are destructuring getNamedAccounts and deployments
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts(); // Destructuring deployer from namedAccounts object present in hardhat.config.js
  const chainId = network.config.chainId;

  // if chainId is X use address Y
  // if chainId is Y use address Z
  // const priceFeedAddress = networkConfig[chainId]["ethUsdFeedAddress"];

  let priceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    priceFeedAddress = ethUsdAggregator.address;
  } else {
    priceFeedAddress = networkConfig[chainId]["ethUsdFeedAddress"];
  }

  const args = [priceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args, // priceFeedAddress is passed here
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args);
  }

  log("-------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
