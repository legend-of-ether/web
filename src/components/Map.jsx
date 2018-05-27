import React from 'react'

import './Map.css'

const itemTypeToUrl = [
  'http://pixeljoint.com/files/icons/full/rustsword.png',
  'http://www.tosbase.com/content/img/icons/items/icon_item_shield_9.png',
]

export const Map = (props) => (
  <main>
    <table>
      <tbody>
        {
          Array(15).fill(0).map((row, indexY) =>
            <tr key={indexY}>{ Array(15).fill(0).map((el, indexX) =>
              <td key={indexX}>
                {
                  props.players
                    .filter(player => player.x === indexX && player.y === indexY)
                    .map(player => player.id && player.id.slice(0, 4))
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