import React from 'react'
import { render} from 'react-dom'
import IO from 'socket.io-client'
import contract from '@legend-of-ether/sol'
import Web3 from 'web3'

import { Ethereal } from './components/Ethereal'

import './index.css'

const { SOCKET_URL } = process.env

async function main() {
  const web3 = await getWeb3Instance()

  const accounts = await web3.eth.getAccounts()
  const id = accounts[0]

  console.log('accounts', accounts)

  const constractAddress = contract.networks['3'].address
  console.log('contract address', `https://ropsten.etherscan.io/address/${constractAddress}`)

  console.log('Connecting to Socket', SOCKET_URL)

  const socket = IO(SOCKET_URL)

  socket.emit('signIn', id)

  const contractInstance = new web3.eth.Contract(contract.abi, contract.networks['3'].address)

  render(<Ethereal socket={socket} myId={id} contract={contractInstance} />, document.getElementById("react-root"))
}

async function getWeb3Instance() {
  // TODO: use 'https://ropsten.infura.io/v3/25915a33d3264e5d975f8759231b9d10' with MetaMask?
  if (window.ethereum) {
    const web3 = new Web3(ethereum);
    await ethereum.enable();
    return web3
  }

  if (window.web3)
    return new Web3(web3.currentProvider);

  throw new Error()
}

main().catch(console.error)
