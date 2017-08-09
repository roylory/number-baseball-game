import React, { Component } from 'react';

export default class GameHeader extends Component {
  render() {
    return (
      <div>
        <h1 className="game-title">
          <span role="img" aria-label="Baseball">&#9918;</span> Number Baseball Game
        </h1>
        <p className="game-desc">
          Guess a 3 digit number. <a href="https://github.com/roylory/number-baseball-game/blob/master/README.md">Rules</a>.
        </p>
      </div>
    );
  }
}
