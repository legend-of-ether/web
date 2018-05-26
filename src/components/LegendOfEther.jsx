import React from 'react'

import { Map } from './Map'
import { Keyboard } from './Keyboard'
import { MetaMaskRequired } from './MetaMaskRequired'
import promisify from 'util.promisify'

import './LegendOfEther.css'

const addressToItems = contract => promisify(contract.addressToItems)

export class LegendOfEther extends React.Component {

  constructor(props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.state = {
      players: []
    }
    this.props.socket.on('signInSuccess', async msg => {
      const players = JSON.parse(msg)
      console.log('signInSuccess', players)
      this.setState(({
        players
      }))
      const swordCount = await addressToItems(this.props.contract)(this.props.myId, 0)
      const shieldCount = await addressToItems(this.props.contract)(this.props.myId, 1)
      console.log(`You have ${swordCount} Rusty Swords and ${shieldCount} Rusty Shields`, )

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