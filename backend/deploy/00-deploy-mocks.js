const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts(); // Destructuring deployer from namedAccounts object present in hardhat.config.js
  const chainId = network.config.chainId;
  const DECIMALS = 8;
  const INITIAL_ANSWER = 200000000000;

  // because we don't want to deploy mock contract on a real testnet or mainnet
  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });
    log("Mocks deployed");
    log("-------------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
