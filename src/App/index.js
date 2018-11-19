import React, { Component } from 'react';
import './App.css';
import styled, {css} from 'styled-components'
import AppLayout from './AppLayout'
import AppBar from './AppBar'
import WelcomeMessage from './WelcomeMessage';

class App extends Component {
  render() {
    return (
      <AppLayout >
        <AppBar />
        <WelcomeMessage />
      </AppLayout>
    );
  }
}

export default App;
