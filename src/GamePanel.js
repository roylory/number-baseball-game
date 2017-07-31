import React, { Component } from 'react';

export default class GamePanel extends Component {
  constructor() {
    super();
    this.throwNumber = this.throwNumber.bind(this);
    this.state = {
      secretNumber: this.generateRandomNumber(),
      gameOver: false,
      resultList: []
    };
  }

  generateRandomNumber() {
    const DIGIT_CNT = 3;
    let randomNumArray = new Array(DIGIT_CNT);

    randomNumArray[0] = Math.floor(Math.random() * 9 + 1);
    for (let i = 1; i < DIGIT_CNT; i++) {
      randomNumArray[i] = Math.floor(Math.random() * 9 + 1);
      for (let j = 0; j < i; j++) { // check dupes
        if (randomNumArray[i] === randomNumArray[j]) {
          i--;
          break;
        }
      }
    }

    return randomNumArray.join('');
  }

  calcBallCount(numStr) {
    // count strikes
    let strikes = 0;
    for (let i = 0; i < 3; i++) {
      if (this.state.secretNumber[i] === numStr[i])
        strikes++;
    }

    // count balls
    let balls = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i !== j && this.state.secretNumber[i] === numStr[j])
          balls++;
      }
    }

    return { strikes, balls };
  }

  throwNumber(numStr) {
    let ballCount = this.calcBallCount(numStr);
    this.setState({
      gameOver: ballCount.strikes === 3,
      resultList: [{
        id: Date.now(),
        number: numStr,
        strikes: ballCount.strikes,
        balls: ballCount.balls,
      }, ...this.state.resultList]
    });
  }

  render() {
    return (
      <div>
        <GuessInput throwNumberFunc={this.throwNumber} gameOver={this.state.gameOver}>
        </GuessInput>
        <GameRecord resultList={this.state.resultList}>
        </GameRecord>
      </div>
    );
  }
}

class GuessInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      hasError: false,
      errorMessage: '',
      currentNumber: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let errorMessage = this.isNumberInvalid(this.state.currentNumber);
    if (errorMessage) {
      this.setState({ hasError: true, errorMessage });
    }
    else {
      this.props.throwNumberFunc(this.state.currentNumber);
      this.setState({ hasError: false, errorMessage: '', currentNumber: '' });
    }
  }

  handleKeyPress(e) {
    const keyCode = (e.keyCode || e.which);
    if (keyCode < 49 || keyCode > 57) // 1 - 9
      e.preventDefault();
  }

  handleInputChange(e) {
    this.setState({ currentNumber: e.target.value });
  }

  isNumberInvalid(numStr) { // returns null if valid. Else, returns error message.
    if (!(/^\d\d\d$/.test(numStr))) {
      return 'It has to be a 3-digit number.';
    }
    else if (/0/.test(numStr)) {
      return '0 cannot be used.';
    }
    else if (numStr[0] === numStr[1] || numStr[0] === numStr[2] || numStr[1] === numStr[2]) {
      return 'Same digit cannot appear more than once.';
    }
    else {
      return false;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p className="error-msg" style={{ display: this.state.hasError ? 'block' : 'none' }}>{this.state.errorMessage}</p>
        <p>
          <input type="text" className="guess-input" minLength="3" maxLength="3" pattern="[1-9]*"
            disabled={this.props.gameOver}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleInputChange}
            value={this.state.currentNumber} />
          <button className="submit-btn" disabled={this.props.gameOver}>Submit</button>
        </p>
      </form>
    );
  }
}

class GameRecord extends Component {
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

class StrikeBalls extends Component {
  render() {
    if(this.props.strikes ===3)
      return (<span>Congratulations. Strikeout!</span>);
    else
      return (<span>B{this.props.balls} S{this.props.strikes}</span>);
  }
}