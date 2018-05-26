import React from 'react'

import './Map.css'

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
                    .filter(player => player.x == indexX && player.y == indexY)
                    .map(player => player.id && player.id.slice(0, 4))
                }
              </td>) }</tr>
          )
        }
      </tbody>
    </table>
  </main>
)