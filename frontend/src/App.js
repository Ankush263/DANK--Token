import './App.css';
import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import ABI from './artifacts/contracts/ERC20Token.sol/DANKToken.json'

import A_logo from './images/A-logo1.png'
import faucet_logo from './images/faucet.png'

function App() {

  const [logedIn, setLogedIn] = useState(false)
  const [signerAddress, setSignerAddress] = useState("")
  const [checkAddress, setCheckAddress] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [sendAmount, setSendAmount] = useState(0)
  const [showBal, setShowBal] = useState(0)
  const deployAddress = "0xBDAAeBb02aA4966F90Db6f149011A84615c9d531"

  const abi = ABI.abi
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  
  
  const Connect = async () => {
    document.querySelector('.button').disabled = true
    
    try {
      if (typeof window.ethereum !== 'undefined') {
      
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const Address = await signer.getAddress()
        setSignerAddress(Address)
        setLogedIn(true)

      }
    } catch (error) {
      console.log("bbbb", error)
    }
  }


//Needed function


  useEffect(() => {
    const foo = async () => {
      const tokenSymbol = "DANK"
      const tokenDecimals = 2
          
      try {
        const wasAdded = window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', 
            options: {
              address: deployAddress, 
              symbol: tokenSymbol, 
              decimals: tokenDecimals,
            },
          },
        });
          
        if (wasAdded) {
          console.log('Thanks for your interest!');
        } else {
          console.log('Your loss!');
        }
      } catch (error) {
          console.log(error)
      }
    }
    foo()
  }, [logedIn])


//Needed function


  
  const freeTokens = async () => {
    const contract = new ethers.Contract(deployAddress, abi, signer)
    
    
    try {
      const Faucet = await contract.faucet(
        signerAddress,
        100
      )

      Faucet.wait()
      // console.log(faucetBal)

    } catch (error) {
      console.log(error)
    }
    
  }


  const checkBalance = async () => {
    const contract = new ethers.Contract(deployAddress, abi, signer)
    console.log(checkAddress)
    try {
      const addr = await contract.balanceOf(
        checkAddress
      )
      const tokens = addr.toNumber()
      setShowBal(tokens)
      console.log(tokens)
    } catch (error) {
      console.log(error)
    }
  }

  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const transferToken = async () => {
    const contract = new ethers.Contract(deployAddress, abi, signer)
    
    try {
      await requestAccount()
      const transaction = await contract.transfer(
        sendAddress,
        sendAmount
      )
      await transaction.wait()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="App">
      {!logedIn ? <div className='card--first'><button onClick={Connect} className="button">Connect Wallet</button></div> :
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

          <input type="text" className='transfer--input' onChange={(e) => setSignerAddress(e.target.value)} value={signerAddress} />

          <p className='faucet--txt'>Get your free DAnkush tokens here! Claim 100 DANK coins(1) to your account.</p>

          
          <button className='btn' onClick={freeTokens}>Gimme gimme</button>
        </div>

        <div className="card check--bal">
          <p className='check--bal--txt'>Check account token balance: </p>
          <input type="text" placeholder='Enter a address' className='check--bal--input' onChange={(e) => setCheckAddress(e.target.value)} value={checkAddress} />
          <button className='btn' onClick={checkBalance}>Check Balance</button>
          <p className='check--bal--txt'>This account has a balance of: {showBal}DANK</p>
        </div>

        <div className="card transfer">
          <div className="input">
            <label htmlFor="Address">
              <p className='label'>To Address: </p>
              <input type="text" className='transfer--input' onChange={(e) => setSendAddress(e.target.value)} value={sendAddress} />
            </label>
            <label htmlFor="number">
              <p className='label'>Amount: </p>
              <input type="number" className='transfer--input' onChange={(e) => setSendAmount(e.target.value)} value={sendAmount} />
            </label>
          </div>
          <button className="btn" onClick={transferToken}>Transfer</button>
        </div>
      </div>
}
  </div>
  );
}

export default App;
