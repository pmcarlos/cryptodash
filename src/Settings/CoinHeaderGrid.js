import React from 'react'
import styled from 'styled-components'

const CoinHeaderGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const CoinSymbol = styled.div`
  justify-self: right;
`

export default function({name, symbol}){
  return(
    <CoinHeaderGridStyled>
      <div> { name } </div>
      <CoinSymbol> { symbol } </CoinSymbol>
    </CoinHeaderGridStyled>
  )
}