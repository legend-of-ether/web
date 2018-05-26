import React from 'react'
import LegendOfEther from '@legend-of-ether/sol'
import { DrizzleProvider } from 'drizzle-react'

import { GameContainer } from '../containers/Game.container'

import './Ethereal.css'

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
          <GameContainer />
        </main>
      </DrizzleProvider>
    )
  }
}
