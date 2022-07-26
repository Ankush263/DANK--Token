import './App.css';
import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import ABI from './artifacts/contracts/ERC20Token.sol/ERC20Token.json'

function App() {

  const [logedIn, setLogedIn] = useState(false)
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState("")
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [tokenAmount, setTokenAmount] = useState(0)

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const abi = ABI.abi
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  // setAddress(contractAddress)
  

  const connect = async () => {
    const contract = new ethers.Contract(contractAddress, abi, signer)
    // setAddress(await signer.getAddress())
    try{
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const Address = await signer.getAddress()
        const Amount = await contract.balanceOf(Address)
        const Name = await contract.name()
        const Symbol = await contract.symbol()
        setLogedIn(true)
        setAddress(Address)
        setAmount(Amount.toNumber())
        setTokenName(Name)
        setTokenSymbol(Symbol)
        // console.log(Amount.toNumber())
      }
    }catch(error){
      console.log("Error: ", error)
    }

  }


  const send = async () => {
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      await contract.transfer(
        sendAddress,
        tokenAmount
      )
    } catch (error) {
      console.log(error)
    }

  }

  const show = async () => {
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      const Show = await contract.balanceOf(sendAddress)
      console.log(Show.toNumber())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      {!logedIn ? <button onClick={connect}>Connect Wallet</button> : <div>Connected</div>}
      <div>
        <h3>Account Adderss : {address}</h3>
        <h4>Name: {tokenName}  Symbol: {tokenSymbol}  Amount : {amount}</h4>
      </div>
      <div>
        <input type="text" placeholder='Enter the recipent Address' onChange={(e) => setSendAddress(e.target.value)} value={sendAddress} />
        <input type="number" placeholder='Enter the amount of tokens' onChange={(e) => setTokenAmount(e.target.value)} value={tokenAmount} />
        <button onClick={send}>Send</button>
      </div>
      <div>
        <input type="text" placeholder='Enter the recipent Address' onChange={(e) => setSendAddress(e.target.value)} />
        <button onClick={show}>Show</button>
      </div>
    </div>
  );
}

export default App;
