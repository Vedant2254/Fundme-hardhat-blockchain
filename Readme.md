<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="readme-data/logo.png" alt="Logo" width="90" height="90">

  <h3 align="center">FundMe - demo decentralized crowdfunding application</h3>

  <p align="center">
    A minimal crowdfuding dApp that runs on a decentralized server, <a href="https://ethereum.org/en/">ethereum blockchain</a>
    <br />
    <a href="https://github.com/Vedant2254/Fundme-hardhat-blockchain"><strong>Explore the source code »</strong></a>
    <br />
    <br />
    <a href="https://vedant2254.github.io/Fundme-hardhat-blockchain/frontend/fundme.html">Live dapp</a>
    ·
    <a href="https://github.com/Vedant2254/Fundme-hardhat-blockchain/issues">Report Issue</a>
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
    <li><a href="#some-backend-usage-examples">Some backend usage examples</a></li>
    <li><a href="#folder-structure">Folder Structure</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://vedant2254.github.io/Fundme-hardhat-blockchain/frontend/fundme.html)

FundMe is a demo crowdfunding [dApp](https://ethereum.org/en/developers/docs/dapps/) that uses a decentralized server as a backend, rather than a centralized server making the system more robust by introducing advantages like zero-downtime, complete data integrity and trustless computation/verifiable behavior.

The server is operated by a Solidity smart contract deployed on Ethereum blockchain. Smart contracts are accessible and transparent like open APIs, so anyone can build a frontend on top of these smart contracts. View FundMe smart contract [here](https://goerli.etherscan.io/address/0x5FD68104b19553e4A16AA93fb3bFE6fa64D8E5BC). HTML, CSS (boostrap) and Javascript are used to create a minimal frontend to assist user interaction with smart contracts on blockchain and send transactions.

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

1. Getting free Goerli ETH
   - Another thing we need to do is to use the [Goerli Faucet](https://goerlifaucet.com/) to request some Goerli ETH for our account. For this you need to signup at [Alchemy](https://dashboard.alchemy.com/). _Alchemy is a blockchain scaling platform that allows developers to securely create, test, and monitor their decentralized apps (DApps). In simple words it's simply a node that helps you connect to a blockchain._
   - After you have signed up and logged into your Alchemy account, visit [Goerli Faucet](https://goerlifaucet.com/), enter the public address of your wallet (present in MetaMask extension) and click on `Send Me ETH`. A transaction will be performed and soon your account will be credited with some Goerli ETH (note that this is not real Ether currency, a fake Ether currency on testnet).
1. Clone the repo
   ```sh
   git clone "https://github.com/Vedant2254/Fundme-hardhat-blockchain"
   ```
1. I have used yarn package manager while developing the project, you can use npm or run below commands to install yarn on you system.

   ```sh
   npm i -g corepack
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
     - Signup or login at [Alchemy](https://dashboard.alchemy.com/).
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

1. Now, first we need to deploy the smart contracts on blockchain then let the frontend know about the contract address, so that it can send transaction requests. _npm users, replace `yarn` with `npx` in below commands_

   - Deploying on local hardhat blockchain -
     - Start the hardhat local blockchain on https://127.0.0.1:8545 using below command
       ```
       yarn hardhat node
       ```
       Keep this blockchain running when interacting with application. Hardhat automatically deploys the smart contracts for you. You don't need to explicitly deploy them.
   - Deploying on Goerli testnet -
     - Before heading over to this part, make sure you have properly setup `.env` file, as it contains the RPC url and the private key of deployer. Also, check if your account has some ETH balance because we have to spend some ETH to deploy the contract. If you don't have ETH see the 2nd point in [Installation](#installation).
     - Run below command to deploy on goerli testnet
       ```
       yarn hardhat deploy --network goerli
       ```
   - Telling the smart contract address to frontend -
     - Go to `backend/deployments/`, then go to `localhost` folder if deployed on localhost or `goerli` folder if deployed on goerli testnet. Copy the value of `address` field in `FundMe.json` file in this folder.
     - Paste the copied address at
     ```js
     export const contractAddress = "CONTRACT-ADDRESS-GOES-HERE";
     ```
     in `frontend/scripts/constants.js`.

1. Lastly, we need to install [live-server](https://www.npmjs.com/package/live-server/v/0.8.0) npm package globally to server the frontend. Just run -

   ```
   npm install live-server -g
   ```

   If you are on linux, you may need to add `sudo` at the start of command.

1. Project is now installed, run command `live-server` from root directory of project and visit https://127.0.0.1:8080

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

_To use the website you need to install MetaMask in your browser. See 1st point in [Installation](#installation)_

_Also, if you want to fund the contract, you need some ETH in your wallet, see 2nd point in [Installation](#installation)_

- **Connecting to MetaMask wallet -** To connect to the wallet click on `Connect ot MetaMask account` button. MetaMask will pop-up to confirm. Select the accounts you want to connect and click on connect.

- **Funding to the contract -** Enter the amount of ETH you want to fund and click on fund. _Note that the contract will make a transaction only if ETH amount is greater than is 50 USD (nearly 0.04 ETH)_

- **Withdraw funds from contract -** Use the `Withdraw` button to withdraw the funds. Transaction will succeed iff the selected MetaMask account is also the account that deployed the contract. If you view the website that I have hosted, then you won't be able to use withdraw.

- **Get Contract Balance -** Use `Get Contract Balance` button to view the balance of contract.

- **View your funds -** `View your funds` shows the amount of funds you have funded to the contract. This resets to 0.0 ETH when the funds are withdrawn from the contract by contract owner.

## Some backend usage examples

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

- **Interacting with smart contracts through CLI -** `scripts` folder contains the basic `fund` and `withdraw` scripts used for making transactions on blockchain. You can run the scripts using following commands. You can also write your own scripts in `scripts/` folder.

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

See [Folder Structure](#folder-structure) to do your experimentation.

## Folder Structure

There is more stuff than above examples that you can do with frontend and backend if you have installed locally. Here's a brief of folders so that you can try out your own experiments -

<ul>
  <details>
    <summary><code>frontend/</code></summary>
    <ul>
      <li><code>scripts/</code> contains the scripts of frontend</li>
      <li><code>static/</code> contains static content like images</li>
      <li><code>fundme.html</code> is the main HTML file</li>
    </ul>
  </details>
  <details>
    <summary><code>backend/</code></summary>
    <ul>
      <details>
        <summary><code>contracts/</code> contains all the contracts code written in <a href="">solidity</a></summary>
        <ul><li><code>test/</code> folder contains the mock contracts (See <a href="./backend/Steps.md">Steps.md</a> to know about mock contracts), that needs to be deployed on local blockchains only.</li></ul>
      </details>
      <details>
        <summary><code>deploy/</code> folder consists of the scripts used for deploying to smart contracts on local as well as testnet blockchains</summary>
        <ul>
          <li><code>unit/</code> consists of unit test, for local testing</li>
          <li><code>staging/</code> consists of staging test, for testnet testing</li>
        </ul>
      </details>
      <details>
        <summary><code>deployments/</code> keeps the record of recent deployments on different networks. The folder is automatically created by <code>hardhat-deploy</code> package when we deploy using <code>yarn hardhat deploy</code></summary>
        <ul>
          <li><code>goerli/</code> contains deployment details of goerli testnet</li>
          <li><code>localhost/</code> contains deployment details of local hardhat blockchan</li>
        </ul>
      </details>
      <details>
        <summary><code>scripts/</code> this folder contains the scripts that can be run using <code>yarn hardhat run</code></summary>
        <ul>
          <li><code>fundme.js</code> script for funding to contract</li>
          <li><code>withdraw.js</code> script for withdrawing funds from contract</li>
        </ul>
      </details>
      <details>
        <summary><code>test/</code> contains the test scipts for testing the contract</summary>
        <ul>
          <li><code>unit/</code> test performed on local blockchain</li>
          <li><code>staging/</code> test performed on testnet</li>
        </ul>
      </details>
      <details>
        <summary><code>utils/</code> utility scripts used in different scenarios, these are imported wherever required.</summary>
        <ul>
          <li><code>verify.js</code> it verifies the contract programatically on <a href="https://etherscan.io/">Etherscan</a></li>
        </ul>
      </details>
      <details>
        <summary><code>hardhat.config.js</code> used for configuring hardhat</summary>
        <ul>
          <li><code>solidity:</code> solidity compiler version is specified here</li>
          <li><code>defaultNetwork:</code> anytime we run hardhat command, by default it runs on this network</li>
          <li><code>networks:</code> different network configurations are specified here</li>
          <li><code>namedAccounts:</code> accounts used for deploying and performing transactions are specified here. The numbers denote the index of private key in <code>accounts</code> array we specified above when configuring <code>networks</code></li>
          <li><code>etherscan:</code> etherscan apiKey, used for verifying the contract on <a href="https://etherscan.io/">Etherscan</a>.</li>
          <li><code>gasReporter:</code> configuration for gas reporter, it shows the gas usage for each transaction when we run <code>yarn hardhat test</code></li>
        </ul>
      </details>
      <details>
        <summary><code>helper-hardhat-config.js</code> is a helper config that is imported in deployment scripts, it exports the following</summary>
        <ul>
          <li>
            <code>networkConfig</code> is a mapping of chainId to the address of contract that gives the price conversion from ETH to USD. This address is passed to smart contract which is used by <code>AggregatorV3Interface</code> in smart contract to give the required price conversions.
          </li>
          <li>
            <code>developmentChains</code> is an array of names of networks that run locally. We need these as in deployment scripts we need to decide if we need to deploy the mock contracts.
          </li>
        </ul>
      </details>
      Other files <code>package.json</code>, <code>yarn.lock</code>, are config files of yarn or npm. You can search to learn more about them.
    </ul>
  </details>
  <code>index.html</code> is just for redirecting to <code>frontend/fundme.html</code> as GitHub pages search for <code>index.html</code> in root directory of project.
</ul>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgements

This project is a part of learning from the [blockchain development course](https://youtu.be/gyMwXuJrbJQ) provided by [freeCodeCamp](https://www.youtube.com/@freecodecamp), taught by [PatrickCollins](https://www.youtube.com/c/PatrickCollins).

I would like to thank [FreeCodeCamp](https://www.freecodecamp.org/) and [PatrickCollins](https://github.com/PatrickAlphaC) for providing such a comprehensive blockchain development course for free.

## Contact

<a href="mailto:pvedant2002@gmail.com"><img src="https://img.icons8.com/color/30/null/gmail--v1.png"/></a>
<a href="https://www.linkedin.com/in/vedant-patil-7500ba221"><img src="https://img.icons8.com/color/30/null/linkedin-circled--v1.png"/></a>

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
[issues-url]: https://github.com/Vedant2254/Fundme-hardhat-blockchain/issuesFundme-hardhat-blockchain/blob/master/LICENSE.txt
[product-screenshot]: ./readme-data/screenshot.png
[html]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[bootstrap]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com/docs/5.0/getting-started/introduction/
[javascript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[javascript-url]: https://www.javascript.com/
[ethereum]: https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white
[ethereum-url]: https://ethereum.org/en/
[chainlink]: https://img.shields.io/badge/chainlink-375BD2?style=for-the-badge&logo=chainlink&logoColor=white
[chainlink-url]: https://chain.link/
[solidity]: https://img.shields.io/static/v1?label=&message=Solidity&color=dodgerblue&style=for-the-badge&logo=hardhat
[solidity-url]: https://docs.soliditylang.org/
[hardhat]: https://img.shields.io/static/v1?label=&message=Hardhat&color=yellow&style=for-the-badge&logo=hardhat
[hardhat-url]: https://hardhat.org/
[ethers.js]: https://img.shields.io/static/v1?label=&message=Ethers.js&color=royalblue&style=for-the-badge&logo=hardhat
[ethers-url]: https://docs.ethers.io/v5/
