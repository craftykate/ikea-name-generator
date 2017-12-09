import React, { Component } from 'react';
import './Description.css';
import { DescriptionBox } from '../DescriptionBox/DescriptionBox';

export class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: 'Enter your description here, then screenshot to share! :)'
    }
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus() {
    this.setState({
      description: ''
    })
  }

  render() {
    return (
      <DescriptionBox description={this.state.description} onFocus={this.onFocus}/>
    );
  }
}
