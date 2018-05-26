import React from 'react'
import PropTypes from 'prop-types'
import IO from 'socket.io-client'
import { union } from 'lodash'

import { MetaMaskRequired } from '../components/MetaMaskRequired'
import { Map } from './Map'
import { Keyboard } from './Keyboard'

const { SOCKET_URL } = process.env
const socket = IO(SOCKET_URL)

export class Game extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.state = {
      players: []
    }
    socket.on('signInSuccess', msg => {
      const json = JSON.parse(msg)
      console.log('signInSuccess', json)
      this.setState(state => ({
        players: json
      }))
    })
    socket.on('updatePlayerPosition', msg => {
      const player = JSON.parse(msg)
      console.log('updatePlayerPosition', player)
      this.setState(state => ({
        players: [
          ...state.players.filter(_ => _.id !== player.id),
          player,
        ]
      }))
    })
    socket.on('userSignedIn', msg => {
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

  componentWillReceiveProps() {
      const { accounts, contracts, drizzleStatus } = this.props
      const { drizzle } = this.context

      if (accounts && accounts[0]) {
        this.setState({ myId: accounts[0], players: union([...this.state.players, accounts[0]]) })
        socket.emit('signIn', accounts[0]) 
      }

      if (contracts.LegendOfEther.initialized) {
        drizzle.contracts.LegendOfEther.methods.hello().call().then(result => alert(result))
      }
  }

  render() {
    const { drizzleStatus, accounts } = this.props

    return (
        <div>
            {(drizzleStatus && accounts && accounts[0]) ? (
              <div>
                <Map players={this.state.players} />
                <Keyboard onKeyDown={this.onKeyDown} />
              </div>

            ): <MetaMaskRequired />}
        </div>
    )
  }

  onKeyDown(event) {
    if (isArrowKey(event.key)) {
      socket.emit('move', JSON.stringify({
        id: this.state.myId,
        direction: arrowKeyToDirection(event.key),
      }))
    }
    this.setState(state => ({
      players: [
        ...state.players.filter(player => player.id !== this.state.myId),
        movePlayer(state.players.find(player => player.id === this.state.myId), event.key),
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