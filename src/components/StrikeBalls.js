import React, { Component } from 'react';

export class StrikeBalls extends Component {
  render() {
    if(this.props.strikes ===3)
      return (<span>Strikeout! Congratulations.</span>);
    else
      return (<span>B{this.props.balls} S{this.props.strikes}</span>);
  }
}