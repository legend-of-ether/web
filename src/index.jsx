import React from 'react'
import { render} from 'react-dom'
import IO from 'socket.io-client'

import { Ethereal } from './components/Ethereal'
import { getAccountIdWithAttempts } from './eth/Account'

import './index.css'

async function main() {
  console.log('getting eth id...')
  const id = await getAccountIdWithAttempts()
  console.log('got eth id', id)

  const socket = IO('http://localhost:3000')

  socket.emit('signIn', id)

  render(<Ethereal socket={socket} myId={id} />, document.getElementById("react-root"))
}

main().catch(console.error)