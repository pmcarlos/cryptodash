import React, {Component} from 'react'
const cc = require('cryptocompare')

export const AppContext = React.createContext()

export class AppProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'dashboard',
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites
    }
  }

  componentDidMount() {
    this.fetchCoins()
  }

  fetchCoins = async() => {
    const coinList = (await cc.coinList()).Data
    this.setState({coinList})
  }
  confirmFavorites =  () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    })

    // localStorage.setItem('cryptoDash', JSON.stringify({
    //   test: 'hello'
    // }))
  }

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))

    return !cryptoDashData ? {page: 'settings', firstVisit: true} : {}
  }
  setPage = page => this.setState({page})

  render(){
    return(
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}