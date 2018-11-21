import React from 'react'
import styled from 'styled-components'
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage'

const SpotLightName = styled.h2`
  text-align: center;
`
export default function() {
  return(
    <AppContext>
      {({coinList, currentFavorite}) => {
        return(
          <Tile> 
            <SpotLightName>{coinList[currentFavorite].CoinName}</SpotLightName>
            <CoinImage spotlight coin={coinList[currentFavorite]}></CoinImage>
          </Tile>
        )
      }

      }
      
    </AppContext>
    
  )
}