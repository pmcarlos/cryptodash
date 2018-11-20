import React from 'react'
import styled from 'styled-components'
import { AppContext } from '../App/AppProvider'
import { SelectableTile, DeletableTile, DisabledTile } from '../Shared/Tile'
import CoinHeaderGrid from './CoinHeaderGrid'
import CoinImage from '../Shared/CoinImage'

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin) {
  return topSection ? () => {
    removeCoin(coinKey)
  } : () => {
    addCoin(coinKey)
  }
}
const AlignCenter = styled.div`
  text-align: center
`
export default function({coinKey, topSection}){
  return (
    <AppContext.Consumer>
      {({coinList, addCoin, removeCoin, isInFavorites}) => {
        let coin = coinList[coinKey]
        const TileClass = topSection ? DeletableTile : isInFavorites(coinKey) ? DisabledTile : SelectableTile
        return (
          <TileClass
            onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
          >
            <CoinHeaderGrid 
              topSection={topSection} 
              name={coin.CoinName} 
              symbol={coin.Symbol} />
            <AlignCenter><CoinImage coin={coin} /></AlignCenter>
          </TileClass>
        )
        
      }}
    </AppContext.Consumer>
  )
}