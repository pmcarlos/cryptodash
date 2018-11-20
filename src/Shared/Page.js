import React from 'react'
import { AppContext } from '../App/AppProvider'

export default function({name, children}) {
  return(
    <AppContext.Consumer>
      {({page}) => {
        return page !== name ? null
        : <div> { children }</div>
      }}
    </AppContext.Consumer>
  )
}
