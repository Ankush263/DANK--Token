import './App.css';
import React, { useState } from 'react'
import { ethers } from 'ethers';
import ABI from './artifacts/contracts/ERC20Token.sol/ERC20Token.json'

function App() {

  const [logedIn, setLogedIn] = useState(false)
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState("")

  const contractAddress = address
  const abi = ABI.abi
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const connect = async () => {

    try{
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setLogedIn(true)
      }
    }catch(error){
      console.log(error)
    }

  }

  const sendToken = async () => {

    const contract = new ethers.Contract(contractAddress, abi, signer)

  }

  return (
    <div className="App">
      {!logedIn && <button onClick={connect}>Connect Wallet</button>}
      <div className="send--token">
        <input type="text" placeholder="Enter The Reciver Address" onChange={(e) => setAddress(e.target.value)} value={address} />
        <input type="number" placeholder="Enter value" onChange={(e) => setAmount(e.target.value)} value={amount} />
        <button onClick={sendToken}>Send Token</button>
      </div>
    </div>
  );
}

export default App;
