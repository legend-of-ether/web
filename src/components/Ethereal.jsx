import React from 'react'

import { getAccountId } from '../eth/Account'

import { Map } from './Map'
import { Keyboard } from './Keyboard'
import { MetaMaskRequired } from './MetaMaskRequired'

import './Ethereal.css'
import IO from 'socket.io-client'

export class Ethereal extends React.Component {

  constructor(props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.state = {
      players: [
        {
          id: getAccountId(),
          x: 3,
          y: 3,
        },
        {
          id: "2",
          x: 12,
          y: 7,
        },
      ]
    }
  }

  render() {
    return (
      <main>
        <Keyboard onKeyDown={this.onKeyDown} />
        <header>
          <h1>Ethereal</h1>
          <h2>A Decentralized MMO Concept</h2>
        </header>
        {
          this.props.myId ?
            <Map players={this.state.players} /> :
            <MetaMaskRequired />
        }
      </main>
    )
  }

  onKeyDown(event) {
    this.props.socket.emit('onKeyDown', JSON.stringify({
      id: this.props.myId,
      key: event.key,
    }))
    this.setState(state => ({
      players: [
        ...state.players.filter(player => player.id !== this.props.myId),
        movePlayer(state.players.find(player => player.id === this.props.myId), event.key),
      ]
    }))
  }

}

function movePlayer(player, key) {
  return {
    ...player,
    x: minMax(0, 14, player.x + arrowToNumberX(key)),
    y: minMax(0, 14, player.y + arrowToNumberY(key)),
  }
}

const minMax = (min, max, val) => Math.min(Math.max(val, min), max)

const arrowToNumberX = arrow => arrow === 'ArrowRight' ? 1 : arrow === 'ArrowLeft' ? -1 : 0

const arrowToNumberY = arrow => arrow === 'ArrowDown' ? 1 : arrow === 'ArrowUp' ? -1 : 0