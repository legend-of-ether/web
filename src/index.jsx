import React from 'react'
import { render} from 'react-dom'
import IO from 'socket.io-client'
import contract from '@legend-of-ether/sol'

import { Ethereal } from './components/Ethereal'
import { getAccountIdWithAttempts } from './eth/Account'

import './index.css'

const { SOCKET_URL } = process.env

async function main() {
  const constractAddress = contract.networks['3'].address
  console.log('contract address', `https://ropsten.etherscan.io/address/${constractAddress}`)

  console.log('getting eth id...')
  const id = await getAccountIdWithAttempts()
  console.log('got eth id', id)

  const socket = IO(SOCKET_URL)

  socket.emit('signIn', id)

  const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'))

  const contractInstance = web3.eth
    .contract(contract.abi)
    .at(contract.networks['3'].address)

  render(<Ethereal socket={socket} myId={id} contract={contractInstance} />, document.getElementById("react-root"))
}

main().catch(console.error)