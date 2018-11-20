import React from 'react'
import styled, {css} from 'styled-components'
import { SelectableTile } from '../Shared/Tile'
import { fontSize3, fontSizeBig, greenBoxShadow } from '../Shared/Styles'
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid'
import { AppContext } from '../App/AppProvider'

function numberFormat(number) {
  return +(number + '').slice(0,7)
}
const PriceTileStyled = styled(SelectableTile)`
  ${props => props.compact && css`
    display: grid;
    ${fontSize3}
    grid-gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    justify-items: right;
  `}
  ${props => props.currentFavorite && css`
    ${greenBoxShadow}
    pointer-events: none;
  `}
`
const TickerPrice = styled.div`
  ${fontSizeBig}
  text-align: center
`
const JustifyRight = styled.div`
  justify-self: right;
`

const JustifyLeft = styled.div`
  justify-self: left;
`

const ChangePct = styled.div`
  color: green;
  ${props => props.red && css`
    color: red;
  `}
`
const Percentage = ({data}) => (
  <JustifyRight>
    <ChangePct red={data.CHANGEPCT24HOUR < 0}>
      {numberFormat(data.CHANGEPCT24HOUR)}
    </ChangePct> 
  </JustifyRight>
)
function PriceTile({sym, data, currentFavorite, setCurrentFavorite}){
  return(
    <PriceTileStyled 
      currentFavorite={currentFavorite}
      onClick={setCurrentFavorite}
      >
      <CoinHeaderGridStyled>
        <div>{sym}</div>
        <Percentage data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>
        ${numberFormat(data.PRICE)}
      </TickerPrice>
    </PriceTileStyled>
  )
}
function PriceTileCompact({sym, data, currentFavorite, setCurrentFavorite}){
  return(
    <PriceTileStyled 
      onClick={setCurrentFavorite}
      compact 
      currentFavorite={currentFavorite}
      >
      <JustifyLeft>{sym}</JustifyLeft>
      <Percentage data={data} />
      <div>${numberFormat(data.PRICE)}</div>
    </PriceTileStyled>
  )
}

export default function({price, index}){
  const sym = Object.keys(price)[0]
  const data = price[sym]['USD']
  const TileClass = index < 5 ? PriceTile : PriceTileCompact

  return(
    <AppContext.Consumer>
      {({currentFavorite, setCurrentFavorite}) => (
        <TileClass 
          sym={sym} 
          data={data} 
          currentFavorite={currentFavorite === sym}
          setCurrentFavorite={() => setCurrentFavorite(sym)}
        />
      )}
    </AppContext.Consumer>
  )
}