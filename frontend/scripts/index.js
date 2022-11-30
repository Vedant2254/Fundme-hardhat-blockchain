import { ethers } from "./ethers-5.6.esm.min.js";
import { contractAddress, abi } from "./constants.js";

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

const loader = `<img src="./static/icons8-iphone-spinner.gif" class="pb-1" width="30" height="30" />`;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

(async function initialize() {
  showWalletConnected();
  await setBtns();
  document.getElementById(
    "contract-link"
  ).href = `https://goerli.etherscan.io/address/${contractAddress}`;
})();

async function setBtns() {
  withdrawBtn.disabled = await isNotOwner();
  fundBtn.disabled =
    withdrawBtn.disabled =
    getSignerFundsBtn.disabled =
      !isWalletConnected();
}

async function isNotOwner() {
  try {
    const ownerAddress = await contract.getOwner();
    const signerAddress = await signer.getAddress();
    return ownerAddress != signerAddress;
  } catch (e) {}
}

function isWalletConnected() {
  return window.ethereum._state.accounts.length != 0;
}

function showWalletConnected() {
  const connDetails = document.getElementById("conn-details");

  if (window.ethereum._state.accounts.length != 0) {
    connDetails.innerText = "Connected to MetaMask wallet!";
    connDetails.classList.remove("text-danger");
    connDetails.classList.add("text-success");
  } else {
    connDetails.innerText = "MetaMask wallet not connected!";
    connDetails.classList.remove("text-success");
    connDetails.classList.add("text-danger");
  }
}

async function connect() {
  const connDetails = document.getElementById("conn-details");

  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      showWalletConnected();
      await setBtns();
    } else {
      connDetails.innerText = "No Metamask installed!";
      connDetails.classList.remove("text-success");
      connDetails.classList.add("text-danger");
    }
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
    console.log("Done!");
  } catch (e) {
    console.log(e);
    fundTxDetails.innerText = "Some error occured!";
    fundTxDetails.classList.add("text-danger");
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
    console.log("Done!");
  } catch (e) {
    withdrawTxDetails.classList.add("text-danger");
    withdrawTxDetails.innerText = "Some error occured!";
    console.log(dir(e));
  }
}

async function getBalance() {
  try {
    const balance = await provider.getBalance(contractAddress);
    document.getElementById(
      "balance-details"
    ).innerHTML = `${ethers.utils.formatEther(balance)} ETH`;
  } catch (e) {}
}

async function signerFunds() {
  try {
    const signerAddress = await signer.getAddress();
    const signerFunds = await contract.getAddressToFund(signerAddress);
    document.getElementById(
      "signer-funds-details"
    ).innerHTML = `${ethers.utils.formatEther(signerFunds)} ETH`;
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
