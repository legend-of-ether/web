import React from 'react'
import { render} from 'react-dom'
import IO from 'socket.io-client'
import promisify from 'util.promisify'

import { Ethereal } from './components/Ethereal'
import { getAccountId } from './eth/Account'

import './index.css'

const delay = promisify(setTimeout)

async function getAccountIdWithAttemps(attemptNumber) {
  const id = getAccountId()

  if (!id) {
    if (attemptNumber > 6)
      throw new Error('attemptNumber ' + attemptNumber)
    await delay(300)
    return getAccountIdWithAttemps(attemptNumber + 1)
  } else {
    return id
  }
}

async function main() {
  console.log('getting eth id...')
  const id = await getAccountIdWithAttemps()
  console.log('got eth id', id)

  const socket = IO('http://localhost:3000')

  socket.emit('signIn', getAccountId())

  render(<Ethereal socket={socket} myId={id} />, document.getElementById("react-root"))
}

main().catch(console.error)