import React, { useState } from "react";
import QRCode from "qrcode.react";
import Web3 from "web3";
import EthereumWallet from "ethereumjs-wallet";

const WalletQRCodeGenerator = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [qrData, setQRData] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);

          // Generate QR code data for the wallet address
          const qrCodeData = `ethereum:${accounts[0]}`;
          setQRData(qrCodeData);
        }
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    } else {
      alert("Metamask not detected. Please install Metamask.");
    }
  };

  return (
    <div>
      <h2>Metamask Wallet QR Code Generator</h2>
      <button onClick={connectWallet}>Connect Wallet</button>

      {walletAddress && (
        <div>
          <h3>Connected Wallet Address:</h3>
          <p>{walletAddress}</p>
        </div>
      )}

      {qrData && (
        <div>
          <h3>Wallet QR Code:</h3>
          <QRCode value={qrData} />
        </div>
      )}
    </div>
  );
};

export default WalletQRCodeGenerator;
