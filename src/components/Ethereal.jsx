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
      players: []
    }
    this.props.socket.on('signInSuccess', msg => {
      const json = JSON.parse(msg)
      console.log('signInSuccess', json)
      this.setState(state => ({
        players: json
      }))
    })
    this.props.socket.on('updatePlayerPosition', msg => {
      const player = JSON.parse(msg)
      console.log('updatePlayerPosition', player)
      this.setState(state => ({
        players: [
          ...state.players.filter(_ => _.id !== player.id),
          player,
        ]
      }))
    })
    this.props.socket.on('userSignedIn', msg => {
      const player = JSON.parse(msg)
      console.log('userSignedIn', player)
      this.setState(state => ({
        players: [
          ...state.players,
          player,
        ]
      }))
    })
  }

  render() {
    return (
      <main>
        <Keyboard onKeyDown={this.onKeyDown} />
        <header>
          <h1>Legend of Ether</h1>
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
    if (isArrowKey(event.key)) {
      this.props.socket.emit('move', JSON.stringify({
        id: this.props.myId,
        direction: arrowKeyToDirection(event.key),
      }))
    }
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

const isArrowKey = key => [ 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp' ].includes(key)

const arrowKeyToDirection = key => key.split('Arrow')[1]