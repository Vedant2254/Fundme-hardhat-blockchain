import { ethers } from "./ethers-5.6.esm.min.js";
import { contractAddress, abi } from "./constants.js";

const connBtn = document.getElementById("conn-btn");
const fundBtn = document.getElementById("fund-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const getBalanceBtn = document.getElementById("get-balance-btn");
connBtn.onclick = connect;
fundBtn.onclick = fund;
withdrawBtn.onclick = withdraw;
getBalanceBtn.onclick = getBalance;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

async function connect() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    connBtn.innerText = "Connected to MetaMask";
  } else {
    document.body.innerText = "No Metamask installed!";
  }
}

async function fund(ethAmount) {
  console.log(`Funding...`);
  ethAmount = document.getElementById("eth-amt").value;
  try {
    const txRes = await contract.fund({
      value: ethers.utils.parseEther(ethAmount),
    });
    await listenForTxMine(txRes);
    console.log("Done!");
  } catch (e) {
    console.log(e);
  }
}

async function withdraw() {
  try {
    const txRes = await contract.withdraw();
    await listenForTxMine(txRes);
    console.log("Done!");
  } catch (e) {
    console.log(e);
  }
}

async function getBalance() {
  const balance = await provider.getBalance(contractAddress);
  console.log(
    `Contract balance (funds): ${ethers.utils.formatEther(balance)} ETH`
  );
}

function listenForTxMine(txRes) {
  console.log(`Please wait, mining transaction ${txRes.hash}...`);
  return new Promise((resolve, reject) => {
    provider.once(txRes.hash, (txReciept) => {
      console.log(`Completed with ${txReciept.confirmations} confirmations`);
      resolve();
    });
  });
}
