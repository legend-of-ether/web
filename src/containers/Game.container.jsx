import React from 'react'
import { drizzleConnect } from 'drizzle-react'
import { Game } from '../components/Game'

const mapStateToProps = state => ({
  drizzleStatus: state.drizzleStatus.initialized,
  contracts: state.contracts,
  accounts: state.accounts
})

export const GameContainer = drizzleConnect(Game, mapStateToProps); 