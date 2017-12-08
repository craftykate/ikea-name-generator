import React, { Component } from 'react';
import './App.css';
import { NameGenerator } from '../NameGenerator/NameGenerator';

class App extends Component {
  render() {
    return (
      <div>
        <NameGenerator />
        <p className="footer">IKEA Name Generator | Built just for kicks by Kate</p>
      </div>
    );
  }
}

export default App;
