import React from 'react'
import { drizzleConnect } from 'drizzle-react'
import { DrizzleStatus } from '../components/DrizzleStatus'

const mapStateToProps = state => ({
  drizzleStatus: state.drizzleStatus.initialized,
  contracts: state.contracts,
  accounts: state.accounts
})

export const DrizzleStatusContainer = drizzleConnect(DrizzleStatus, mapStateToProps); 