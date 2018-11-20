import React, { Component } from 'react';
import './App.css';
import styled, {css} from 'styled-components'
import AppLayout from './AppLayout'
import AppBar from './AppBar'
import WelcomeMessage from './WelcomeMessage'
import {AppProvider} from './AppProvider'

class App extends Component {
  render() {
    return (
      <AppLayout >
        <AppProvider>
          <AppBar />
          <WelcomeMessage />
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
