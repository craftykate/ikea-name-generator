import React, { Component } from 'react';
import './App.css';
import { NameGenerator } from '../NameGenerator/NameGenerator';

class App extends Component {
  render() {
    return (
      <div>
        <NameGenerator />
        <div className="footer">
          <p>IKEA Name Generator</p>
          <p>Built just for kicks by Kate McFaul</p>
          <p>ikea-name-generator.surge.sh</p>
        </div>
      </div>
    );
  }
}

export default App;
