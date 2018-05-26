import { delay } from '../helper'

export function getAccountId() {
  return typeof web3 !== 'undefined' && web3.eth.accounts[0]
}

export async function getAccountIdWithAttempts(attemptNumber = 0) {
  const id = getAccountId()

  if (id) {
    return id
  } else {
    if (attemptNumber > 6)
      return null
    await delay(500)
    return getAccountIdWithAttempts(attemptNumber + 1)
  }
}