require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("solidity-coverage");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const COINMARKET_CAP_KEY = process.env.COINMARKET_CAP_KEY || "";

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.8.17" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    // localhost: {
    //   url: "http://127.0.0.1:8545/",
    //   chainId: 31337,
    // },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 5,
    },
  },
  // This JS object is returned by function hardhat.getNamedAccounts() or hre.getNamedAccounts()
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "INR",
    coinmarketcap: COINMARKET_CAP_KEY,
  },
};
