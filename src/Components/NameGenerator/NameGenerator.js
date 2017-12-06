import React, { Component } from 'react';
import './NameGenerator.css';
import { Name } from '../Name/Name';
import { Button } from '../Button/Button';
import Alphabet from '../../utils/Alphabet';


export class NameGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Fjordnang"
    }
    this.generateName = this.generateName.bind(this);
  }

  generateName() {
    const length = this.setWordLength();
    let word = '';
    for (let arrayIndex = 0; arrayIndex < length; arrayIndex++) {
      let nextLetter = this.getNextLetter(word);
    	word += nextLetter;
    }
    this.setState({
      name: word
    })
  }

  setWordLength() {
    return Math.floor(Math.random() * 11) + 4;
  }

  getNextLetter(word) {
    let grabAlphabet = '';
    if (word.length === 0) {
      grabAlphabet = Alphabet.getAlphabet();
      return grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)];
    } else {
      const lastLetter = word[word.length - 1];
      grabAlphabet = 'after' + lastLetter;
      return grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)];
    }
  }

  render() {
    return (
      <div className="nameBox">
        <Name name={this.state.name} />
        <Button onClick={this.generateName} />
      </div>
    );
  }
}
