import React, {Component} from 'react'
import _ from 'lodash'

const cc = require('cryptocompare')

const MAX_FAVORITES = 10

export const AppContext = React.createContext()

export class AppProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'settings',
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      filteredCoins: null,
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setFilteredCoins: this.setFilteredCoins
    }
  }

  componentDidMount() {
    this.fetchCoins()
    this.fetchPrices()
  }

  async prices() {
    const returnData = []
    for(let favorite of this.state.favorites) {
      try {
        const priceData = await cc.priceFull(favorite, 'USD')
        returnData.push(priceData)
      } catch(e) {
        console.warn('Fetch price error', e)
      }
    }
    return returnData
  }

  async fetchPrices() {
    if(this.state.firstVisit) return
    let prices = await this.prices()
    this.setState({ prices })
  }

  fetchCoins = async() => {
    const coinList = (await cc.coinList()).Data
    this.setState({coinList})
  }

  addCoin = key => {
    let favorites = [...this.state.favorites]
    if(favorites.length < MAX_FAVORITES) {
      favorites.push(key)
      this.setState({favorites})
    }
  }

  removeCoin = key => {
    let favorites = [...this.state.favorites]
    this.setState({favorites: _.pull(favorites, key)})
  }

  isInFavorites = key => _.includes(this.state.favorites, key)

  confirmFavorites =  () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    }, () => {
      this.fetchPrices()
    })

    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites
    }))
  }

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))

    return !cryptoDashData ? {page: 'settings', firstVisit: true} : {favorites: cryptoDashData.favorites}
  }
  setPage = page => this.setState({page})

  setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

  render(){
    return(
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}