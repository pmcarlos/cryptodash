import React from 'react'
import { AppContext } from '../App/AppProvider'

export default function({children}){
  return(
    <AppContext.Consumer>
      {({coinList}) => {
        if(!coinList){
          return <div>Loading coins...</div>
        }
        return <dir>{ children }</dir>
      }}
    </AppContext.Consumer>
  )
}