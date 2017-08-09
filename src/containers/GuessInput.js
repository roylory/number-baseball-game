import React, { Component } from 'react';
import { connect } from 'react-redux'
import { guessNumber } from '../actions'

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
      this.props.dispatch(guessNumber(this.state.currentNumber));
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

GuessInput = connect()(GuessInput);
export default GuessInput;