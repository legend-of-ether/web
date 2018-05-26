import React from 'react'
import PropTypes from 'prop-types'

const helloWorld = async () => {
    const result =  await drizzle.contracts.LegendOfEther.methods.hello().call()
    return <p>{result}</p> || null
}

export const DrizzleStatus = ({ drizzleStatus, contracts, accounts }, { drizzle }) => (
    <div>
        <div>drizzleStatus: {drizzleStatus.toString()}</div>
    </div>
)

DrizzleStatus.contextTypes = {
    drizzle: PropTypes.object
}
  