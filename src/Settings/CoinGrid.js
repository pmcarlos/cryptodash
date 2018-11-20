import React from 'react'
import styled, {css} from 'styled-components'
import { AppContext } from '../App/AppProvider'
import { SelectableTile } from '../Shared/Tile'
import CoinTile from './CoinTile'

const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`

function getLowerSectionCoins(coinList, filteredCoins) {
  return(filteredCoins && Object.keys(filteredCoins)) || Object.keys(coinList).slice(0, 100)
}
function getCoinsToDisplay (coinList, topSection, favorites, filteredCoins) {
  return topSection ? favorites : getLowerSectionCoins(coinList, filteredCoins)
}
export default function({topSection}) {
  return(
    <AppContext.Consumer>
      {({coinList, favorites, filteredCoins}) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey => (
            <CoinTile topSection={topSection} key={coinKey} coinKey={coinKey} />
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  )
}