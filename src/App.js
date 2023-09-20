import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Web3 from 'web3';
import './App.css';

const MetaMaskQRCodeGenerator = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [qrData, setQRData] = useState('');

  const connectToMetaMask = async () => {
    if (window.ethereum) {
        // Request access to the MetaMask wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a Web3 instance
        const web3 = new Web3(window.ethereum);

        // Get the selected account's address
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        setWalletAddress(address);
        setQRData(address);
      
    } else {
      console.error('MetaMask not detected. Please install MetaMask.');
    }
  };

  return (
    <div className='div'> 
    <div className='div1'>
      <h2>Wallet QR Code Generator</h2>
      {walletAddress ? (
        <div>
          <h3>Your Wallet Address:</h3>
          <p>{walletAddress}</p>
        </div>
      ) : (
        <button onClick={connectToMetaMask} className='btn'>Connect</button>
      )}

      {qrData && (
        <div>
          <h3>QR Code:</h3>
          <QRCode value={qrData} />
        </div>
      )}
      </div>
    </div>
  );
};

export default MetaMaskQRCodeGenerator;
