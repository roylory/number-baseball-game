import React, { Component } from 'react';
import {StrikeBalls} from './StrikeBalls'

export default class GameRecord extends Component {
  render() {
    return (
      <ul className="game-record-list">
        {this.props.resultList.map((result, n) => (
          <li key={result.id} className={n === 0 ? "highlight" : ""}>
            <b className="game-record-number">{result.number}</b>
            <StrikeBalls strikes={result.strikes} balls={result.balls} />
          </li>
        ))}
      </ul>
    );
  }
}