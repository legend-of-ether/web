import { delay } from '../helper'

export function getAccountId() {
  return new Promise((resolve) => {
    if (typeof web3 !== 'undefined') {
      web3.eth.getAccounts((err, addresses) => resolve(addresses[0]))
    }
  })
}

export async function getAccountIdWithAttempts(attemptNumber = 0) {
  const id = getAccountId()

  if (id) {
    return id
  } else {º
    if (attemptNumber > 6)
      return null
    await delay(500)
    return getAccountIdWithAttempts(attemptNumber + 1)
  }
}