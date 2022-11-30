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

const contractLink = document.getElementById("contract-link");
const balanceDetails = document.getElementById("balance-details");
const signerFundsDetails = document.getElementById("signer-funds-details");

let provider;
let signer;
let contract;

function initialize(set) {
  set &&
    setTimeout(async () => {
      setConnDetails();
      await setBtns();
      await setGlobals();
    }, 500);
  contractLink.href = `https://goerli.etherscan.io/address/${contractAddress}`;
  balanceDetails.innerText = balanceDetailsMessage;
  signerFundsDetails.innerText = signerFundsDetailsMessage;
}
(() => {
  initialize(true);
})();

function setConnDetails() {
  const connDetails = document.getElementById("conn-details");

  if (window.ethereum) {
    if (window.ethereum._state.accounts.length != 0) {
      connDetails.innerText = "Connected to MetaMask wallet!";
      connDetails.classList.remove("text-danger");
      connDetails.classList.add("text-success");
    } else {
      connDetails.innerText = "MetaMask wallet not connected!";
      connDetails.classList.remove("text-success");
      connDetails.classList.add("text-danger");
    }
  } else {
    connDetails.innerText = "No Metamask installed!";
    connDetails.classList.remove("text-success");
    connDetails.classList.add("text-danger");
  }
}

async function setBtns() {
  withdrawBtn.disabled = await isNotOwner();
  fundBtn.disabled =
    withdrawBtn.disabled =
    getSignerFundsBtn.disabled =
      !(window.ethereum && window.ethereum._state.accounts.length != 0);
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
  } catch (e) {}
}

async function connect() {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await setBtns();
    }
    setConnDetails();
  } catch (e) {}
}

async function fund(ethAmount) {
  console.log(`Funding...`);
  const fundTxDetails = document.getElementById("fund-tx-details");
  fundTxDetails.classList.remove("text-danger");
  ethAmount = document.getElementById("eth-amt").value;

  try {
    fundTxDetails.innerText = "Waiting for confirmation...";
    const txRes = await contract.fund({
      value: ethers.utils.parseEther(ethAmount),
    });
    await listenForTxMine(txRes, fundTxDetails);
    initialize(false);
    console.log("Done!");
  } catch (e) {
    fundTxDetails.innerText = "Some error occured!";
    fundTxDetails.classList.add("text-danger");
    console.log(e);
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
    withdrawTxDetails.innerText = "Waiting for confirmation...";
    const txRes = await contract.withdraw();
    await listenForTxMine(txRes, withdrawTxDetails);
    initialize(false);
    console.log("Done!");
  } catch (e) {
    withdrawTxDetails.classList.add("text-danger");
    withdrawTxDetails.innerText = "Some error occured!";
    console.log(e);
  }
}

async function getBalance() {
  try {
    const balance = await provider.getBalance(contractAddress);
    balanceDetails.innerHTML = `${ethers.utils.formatEther(balance)} ETH`;
  } catch (e) {}
}

async function signerFunds() {
  try {
    const signerAddress = await signer.getAddress();
    const signerFunds = await contract.getAddressToFund(signerAddress);
    signerFundsDetails.innerHTML = `${ethers.utils.formatEther(
      signerFunds
    )} ETH`;
  } catch (e) {}
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
