<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="readme-data/logo.png" alt="Logo" width="90" height="90">

  <h3 align="center">FundMe - demo decentralized crowdfunding</h3>

  <p align="center">
    A minimal crowdfuding web application that run on a decentralized server, ethereum blockchain
    <br />
    <a href="https://github.com/Vedant2254/Fundme-hardhat-blockchain"><strong>Explore the source code »</strong></a>
    <br />
    <br />
    <a href="https://vedant2254.github.io/Fundme-hardhat-blockchain/frontend/fundme.html">View Demo</a>
    ·
    <a href="https://github.com/Vedant2254/Fundme-hardhat-blockchain/issues">Report Issue</a>
    ·
    <a href="https://github.com/Vedant2254/Fundme-hardhat-blockchain/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://vedant2254.github.io/Fundme-hardhat-blockchain/frontend/fundme.html)

FundMe is a demo crowdfunding [dApp](https://ethereum.org/en/developers/docs/dapps/) that uses a decentralized server as a backend, rather than a centralized server making the system more robust by introducing advantages like zero-downtime, complete data integrity and trustless computation/verifiable behavior. The server is operated by a Solidity smart contract deployed on Ethereum blockchain, smart contracts are accessible and transparent like an open APIs. HTML, CSS and Javascript are used to create a minimal frontend to assist user interaction with smart contracts on blockchain and send transactions.

This project is a part of learning from the blockchain development course by [freeCodeCamp](https://www.freecodecamp.org/) on their Youtube channel [freeCodeCamp.org](https://youtu.be/gyMwXuJrbJQ).

See <a href="#getting-started">Getting Started</a> section to install the project locally.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Following are the major frameworks / libraries used in the project -

[![HTML][html]][html-url] [![Bootstrap][bootstrap]][bootstrap-url]
[![Javascript][javascript]][javascript-url] [![Ethereum][ethereum]][ethereum-url] [![Chainlink][chainlink]][chainlink-url] [![Solidity][solidity]][solidity-url] [![Hardhat][hardhat]][hardhat-url] [![Ethers][ethers.js]][ethers-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

The following section explains how you can setup the project locally. To get the local copy up and running follow these steps -

### Prerequisites

For prerequisites, you need to have [Node.js and npm](https://nodejs.org/en/download/) installed on your system. You can download the appropriate installer from the link depending on your system.

```
npm --version
```

running the above command should print the installed version of npm. This verifies than npm is installed on your system.

### Installation

1. Let's start by setting up MetaMask in browser.
   - Download and add [MetaMask](https://metamask.io/download/) extension to your desired browser.
   - Click on the extension and follow the instructions properly to create a new wallet or to import an existing wallet.
1. Clone the repo
   ```sh
   git clone "https://github.com/Vedant2254/Fundme-hardhat-blockchain"
   ```
1. I have used yarn package manager while developing the project, you can use npm or run below commands to install yarn on you system.

   ```sh
   npm i -g coorepack
   corepack enable
   ```

1. Install required dependencies. Replace `yarn` with `npm` in the below command only if you are using npm package manager.

   ```sh
   yarn install
   ```

1. Create a new file named `.env` and copy paste the below code snippet.

   ```
   GOERLI_RPC_URL=
   PRIVATE_KEY=
   ETHERSCAN_API_KEY=
   COINMARKET_CAP_KEY=
   ```

1. Getting RPC url, Wallet private key and required API keys.

   - **RPC url (Goerli testnet)-**
     - Signup at [Alchemy](https://dashboard.alchemy.com/). Alchemy is a blockchain scaling platform that allows developers to securely create, test, and monitor their decentralized apps (DApps).
     - After signup is completed goto your account [dashboard](https://dashboard.alchemy.com/) - click on `+ CREATE APP` button - fill in the name and description asper your choice - select CHAIN as **Ethereum** and NETWORK as **Goerli**.
     - Once the app is created you could see it in your dashboard. Click on `VIEW KEY` and copy the `HTTPS` link. Place it in the `.env` file as shown below
     ```
     GOERLI_RPC_URL = YOUR-RPC-URL-GOES-HERE
     ```
   - **Wallet private key -**
     - To get the private key of your MetaMask wallet, open MetaMask - click on three dots on the right side of window - click on account details - click on `Export private key` - enter you wallet password - copy the private key displayed.
     - Place your private key in `.env` file as shown below
     ```
     PRIVATE_KEY = YOU-PRIVATE-KEY-GOES-HERE
     ```
   - **Etherscan API key (optional) -**
     - Will write it soon, you can check it out by yourself at [Etherscan](https://etherscan.io/)
   - **Coinmarketcap API key (optional) -**

     - Will write it soon, you can check it out by yourself at [Coinmarketcap](https://pro.coinmarketcap.com/)

   - Start by creating a new file named `.env`

1. Project is now installed, head to <a href="#usage">Usage</a> section to learn about using it.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

_Note for npm users, replace `yarn` in commands with `npx`_

The section summarizes some examples of operations that could be performed on the application backend. Some of the operations that can be performed include -

- **Deploying smart contracts on local hardhat blockchain -** You can run a local hardhat blockchain at [http://127.0.0.1:8545/](http://127.0.0.1:8545/) using following command.

  ```
  yarn hardhat node
  ```

  Hardhat automatically deploys the smart contracts for you. You don't need to explicitly deploy them.

- **Deploying smart contracts on goerli testnet -** You the below command to deploy the smart contracts on goerli testnet. Before running the command make sure you have properly setup `.env` file, as it contains the RPC url and the private key of deployer.

  ```
  yarn hardhat deploy --network goerli
  ```

- **Interacting with smart contracts through CLI -** `scripts` folder contains the basic `fund` and `withdraw` scripts used for making transactions on blockchain. You can run the scripts using following commands. You can write your own scripts in `scripts/` folder.

  - fund.js

    ```
    yarn hardhat run scripts/fund.js
    ```

  - withdraw.js

    ```
    yarn hardhat run scripts/withdraw.js
    ```

- **Testing smart contracts -** Use following command to run unit test and staging tests on the contracts. The tests are specified in the `test/` folder. `test/unit` includes a `.js` file that includes are the unit tests i.e. the tests performed on local blockchain and `test/staging` includes staging test i.e. performed on original blockchain (Goerli Testnet). You can add your own tests in the javascript files.

  ```
  yarn hardhat test
  ```

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Vedant2254/Fundme-hardhat-blockchain?style=for-the-badge
[contributors-url]: https://github.com/Vedant2254/Fundme-hardhat-blockchain/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Vedant2254/Fundme-hardhat-blockchain?style=for-the-badge
[forks-url]: https://github.com/Vedant2254/Fundme-hardhat-blockchain/network/members
[stars-shield]: https://img.shields.io/github/stars/Vedant2254/Fundme-hardhat-blockchain?style=for-the-badge
[stars-url]: https://github.com/Vedant2254/Fundme-hardhat-blockchain/stargazers
[issues-shield]: https://img.shields.io/github/issues/Vedant2254/Fundme-hardhat-blockchain?style=for-the-badge
[issues-url]: https://github.com/Vedant2254/Fundme-hardhat-blockchain/issues
[license-shield]: https://img.shields.io/github/license/Vedant2254/Fundme-hardhat-blockchain?style=for-the-badge
[license-url]: https://github.com/Vedant2254/Fundme-hardhat-blockchain/blob/master/LICENSE.txt
[product-screenshot]: ./readme-data/screenshot.png
[html]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[bootstrap]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: #
[javascript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[javascript-url]: #
[ethereum]: https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white
[ethereum-url]: #
[chainlink]: https://img.shields.io/badge/chainlink-375BD2?style=for-the-badge&logo=chainlink&logoColor=white
[chainlink-url]: #
[solidity]: https://img.shields.io/static/v1?label=&message=Solidity&color=dodgerblue&style=for-the-badge&logo=hardhat
[solidity-url]: #
[hardhat]: https://img.shields.io/static/v1?label=&message=Hardhat&color=yellow&style=for-the-badge&logo=hardhat
[hardhat-url]: #
[ethers.js]: https://img.shields.io/static/v1?label=&message=Ethers.js&color=royalblue&style=for-the-badge&logo=hardhat
[ethers-url]: #
