import React, { Component } from 'react';
import GamePanel from './GamePanel.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="game-title"><span role="img" aria-label="Baseball">&#9918;</span> Number Baseball Game</h1>
        <p className="game-desc">Guess a 3 digit number. <a href="https://github.com/roylory/number-baseball-game">Rules</a>.</p>
        <GamePanel>
        </GamePanel>
      </div>
    );
  }
}

export default App;
