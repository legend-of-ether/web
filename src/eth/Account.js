export function getAccountId() {
  return typeof web3 !== 'undefined' && web3.eth.accounts[0]
}