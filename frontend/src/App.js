import './App.css';
import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import ABI from './artifacts/contracts/ERC20Token.sol/ERC20Token.json'

import A_logo from './images/A-logo1.png'
import faucet_logo from './images/faucet.png'

function App() {

  const [logedIn, setLogedIn] = useState(false)
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState("")
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [tokenAmount, setTokenAmount] = useState(0)

  const contractAddress = "0x2a2D6a534Fab584A10A1d09BAeCF81E0977bC124"
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
      <div className="card header">
        <img src={A_logo} alt="A" />
        <p className='head'>DANK</p>
      </div>

      <div className='card faucet'>
        <div className="faucet--head">
          <img src={faucet_logo} alt="faucet_logo" className='faucet--logo' />
          <p className='faucet--head--txt'>Faucet</p>
        </div>

        <p className='faucet--txt'>Get your free DAnkush tokens here! Claim 100 DANK coins to your account.</p>

        <button className='btn'>Gimme gimme</button>
      </div>

      <div className="card check--bal">
        <p className='check--bal--txt'>Check account token balance: </p>
        <input type="text" placeholder='Enter a address' className='check--bal--input' />
        <button className='btn'>Check Balance</button>
        <p className='check--bal--txt'>This account has a balance of: </p>
      </div>

      <div className="card transfer">
        <div className="input">
          <label htmlFor="Address">
            <p className='label'>To Address: </p>
            <input type="text" className='transfer--input' />
          </label>
          <label htmlFor="number">
            <p className='label'>Amount: </p>
            <input type="number" className='transfer--input' />
          </label>
        </div>
        <button className="btn">Transfer</button>
      </div>

        {/* {!logedIn ? <button onClick={connect} className="button">Connect Wallet</button> 

        : 
        <div>

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
        </div>} */}

    </div>
  );
}

export default App;
