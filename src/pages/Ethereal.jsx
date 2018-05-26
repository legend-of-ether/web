import React from 'react'
import PropTypes from 'prop-types'
import LegendOfEther from '@legend-of-ether/sol'
import { DrizzleProvider } from 'drizzle-react'

import { getAccountId } from '../eth/Account'

import { Map } from '../components/Map'
import { Keyboard } from '../components/Keyboard'
import { MetaMaskRequired } from '../components/MetaMaskRequired'

import { DrizzleStatusContainer } from '../containers/DrizzleStatus.container'

import { GameContainer } from '../containers/Game.container'

import './Ethereal.css'
import IO from 'socket.io-client'

const options = {
  contracts: [
    LegendOfEther,
  ]
}

export class Ethereal extends React.Component {
  render() {
    return (
      <DrizzleProvider options={options}>
        <main>
          <header>
            <h1>Legend of Ether</h1>
            <h2>A Decentralized MMO Concept</h2>
          </header>
          <MetaMaskRequired />
          <GameContainer />
        </main>
      </DrizzleProvider>
    )
  }
}
