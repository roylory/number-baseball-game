import React, { Component } from 'react';
import GameHeader from './GameHeader';
import GuessInput from '../containers/GuessInput';
import GameRecordContainer from '../containers/GameRecordContainer';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <GameHeader />
        <GuessInput />
        <GameRecordContainer />
      </div>
    );
  }
}

export default App;
