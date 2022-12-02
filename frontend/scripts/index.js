import { ethers } from "./ethers-5.6.esm.min.js";
import {
  balanceDetailsMessage,
  signerFundsDetailsMessage,
  loader,
  contractAddress,
  abi,
} from "./constants.js";

const connBtn = document.getElementById("conn-btn");
const fundBtn = document.getElementById("fund-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const getBalanceBtn = document.getElementById("get-balance-btn");
const getSignerFundsBtn = document.getElementById("get-signer-funds-btn");
connBtn.onclick = connect;
fundBtn.onclick = fund;
withdrawBtn.onclick = withdraw;
getBalanceBtn.onclick = getBalance;
getSignerFundsBtn.onclick = signerFunds;

const ethInput = document.getElementById("eth-amt");
const contractLink = document.getElementById("contract-link");
const balanceDetails = document.getElementById("balance-details");
const signerFundsDetails = document.getElementById("signer-funds-details");

const MetaMaskNotInstalled = "No Metamask installed!";
const MetaMaskConnected = "Connected to MetaMask wallet!";
const MetaMaskNotConnected = "MetaMask wallet not connected!";

let provider;
let signer;
let contract;

/**
 * (done only once) Sets messages of connection
 * (done only once) Sets globls i.e. provider, signer and contract
 * (done only once) Sets buttons disabled based on conditions
 * Resets message of balance details
 * Resets message of signer funds details
 */
function initialize(set) {
  if (set) {
    setTimeout(async () => {
      setConnDetails();
      await setGlobals();
      await setBtns();
    }, 500);
    contractLink.href = `https://goerli.etherscan.io/address/${contractAddress}`;
  }
  balanceDetails.innerText = balanceDetailsMessage;
  signerFundsDetails.innerText = signerFundsDetailsMessage;
}
(() => {
  initialize(true);
})();

/** main functions
 * connect - connecting to metamask
 * fund - funding to contract
 * withdraw - withdrawing from contract
 * getBalance - getting balance
 * signerFunds - getting signer funds
 * listenForTxMine - listening to transaction mine
 */
async function connect() {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await setBtns();
    }
    setConnDetails();
  } catch (e) {}
}

async function fund() {
  console.log(`Funding...`);
  const fundTxDetails = document.getElementById("fund-tx-details");
  fundTxDetails.classList.remove("text-danger");

  try {
    throwMetaMaskError();
    fundTxDetails.innerText = "Waiting for confirmation...";
    const txRes = await contract.fund({
      value: ethers.utils.parseEther(ethInput.value),
    });
    await listenForTxMine(txRes, fundTxDetails);
    initialize(false);
    console.log("Done!");
  } catch (e) {
    let emsg = e.error ? e.error : e;
    emsg = emsg.message || "Some error occured!";
    fundTxDetails.innerText = `${emsg}`;
    fundTxDetails.classList.add("text-danger");
    console.log(e.message);
  }
}

async function withdraw() {
  if (await isNotOwner()) {
    withdrawBtn.disabled = true;
    return;
  }

  const withdrawTxDetails = document.getElementById("withdraw-tx-details");
  withdrawTxDetails.classList.remove("text-danger");

  try {
    throwMetaMaskError();
    withdrawTxDetails.innerText = "Waiting for confirmation...";
    const txRes = await contract.withdraw();
    await listenForTxMine(txRes, withdrawTxDetails);
    initialize(false);
    console.log("Done!");
  } catch (e) {
    let emsg = e.error ? e.error : e;
    emsg = emsg.message || "Some error occured!";
    withdrawTxDetails.innerText = `${emsg}`;
    withdrawTxDetails.classList.add("text-danger");
    console.log(e);
  }
}

async function getBalance() {
  try {
    throwMetaMaskNotInstalled();
    const balance = await provider.getBalance(contractAddress);
    balanceDetails.classList.remove("text-danger");
    balanceDetails.innerHTML = `${ethers.utils.formatEther(balance)} ETH`;
  } catch (e) {
    let emsg = e.error ? e.error : e;
    emsg = emsg.message || "Some error occured!";
    balanceDetails.innerText = `${emsg}`;
    balanceDetails.classList.add("text-danger");
    console.log(e);
  }
}

async function signerFunds() {
  try {
    throwMetaMaskError();
    const signerAddress = await signer.getAddress();
    const signerFunds = await contract.getAddressToFund(signerAddress);
    signerFundsDetails.classList.remove("text-danger");
    signerFundsDetails.innerHTML = `${ethers.utils.formatEther(
      signerFunds
    )} ETH`;
  } catch (e) {
    let emsg = e.error ? e.error : e;
    emsg = emsg.message || "Some error occured!";
    signerFundsDetails.innerText = `${emsg}`;
    signerFundsDetails.classList.add("text-danger");
    console.log(e);
  }
}

function listenForTxMine(txRes, element) {
  let txLink = `<a class="text-decoration-none" href="https://goerli.etherscan.io/tx/${txRes.hash}" target='_blank'>${txRes.hash}</a>`;
  element.innerHTML = `Please wait, mining transaction ${txLink} ${loader}`;
  return new Promise((resolve, reject) => {
    provider.once(txRes.hash, (txReciept) => {
      element.innerHTML = `Completed ${txLink} with ${txReciept.confirmations} block confirmations`;
      resolve();
    });
  });
}

/** helpers
 * setConnDetails - sets messages for connection details
 * setBtns - sets buttons disabled or not
 * setGlobals - sets globals i.e. provider, signer and contract
 * isNotOwner - returns true if signer is the owner of contract else false
 */
function setConnDetails() {
  const connDetails = document.getElementById("conn-details");

  if (window.ethereum) {
    if (window.ethereum._state.accounts.length != 0) {
      connDetails.innerText = MetaMaskConnected;
      connDetails.classList.remove("text-danger");
      connDetails.classList.add("text-success");
    } else {
      connDetails.innerText = MetaMaskNotConnected;
      connDetails.classList.remove("text-success");
      connDetails.classList.add("text-danger");
    }
  } else {
    connDetails.innerText = MetaMaskNotInstalled;
    connDetails.classList.remove("text-success");
    connDetails.classList.add("text-danger");
  }
}

async function setBtns() {
  ethInput.disabled =
    fundBtn.disabled =
    getSignerFundsBtn.disabled =
      !(window.ethereum && window.ethereum._state.accounts.length != 0);
  getBalanceBtn.disabled = !window.ethereum;
  withdrawBtn.disabled = fundBtn.disabled || (await isNotOwner());
}

async function setGlobals() {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
  } catch (e) {}
}

async function isNotOwner() {
  try {
    const ownerAddress = await contract.getOwner();
    const signerAddress = await signer.getAddress();
    return ownerAddress != signerAddress;
  } catch (e) {
    console.log(e);
  }
}

/** custom error throwers
 * throwMetaMaskNotInstalled - throws error if metamask is not installed
 * throwMetaMaskNotConnected - throws error if metamask is not connected
 * throwMetaMaskError - throws error if metamask if not installed or not connected
 */
function throwMetaMaskNotInstalled() {
  if (!window.ethereum) throw new Error(MetaMaskNotInstalled);
}

function throwMetaMaskNotConnected() {
  if (window.ethereum._state.accounts.length == 0)
    throw new Error(MetaMaskNotConnected);
}

function throwMetaMaskError() {
  throwMetaMaskNotInstalled();
  throwMetaMaskNotConnected();
}
