import React from 'react'

import { itemTypeToUrl } from '../helper'

import './Map.css'

export const Map = (props) => (
  <main>
    <table>
      <tbody>
        {
          Array(10).fill(0).map((row, indexY) =>
            <tr key={indexY}>{ Array(15).fill(0).map((el, indexX) =>
              <td key={indexX}>
                {
                  props.players
                    .filter(player => player.x === indexX && player.y === indexY)
                    .map(player => player.id && <div><img src={'https://raw.githubusercontent.com/legend-of-ether/web/master/hero.gif'} /> {player.id.slice(0, 4)} </div>)
                }
                {
                  props.gameItems && props.gameItems
                    .filter(item => item.x === indexX && item.y === indexY)
                    .map((item, index) => <img key={index} src={itemTypeToUrl[item.type]} />)
                }
              </td>) }</tr>
          )
        }
      </tbody>
    </table>
  </main>
)