import React, { Component } from 'react';
import './NameGenerator.css';
import { Name } from '../Name/Name';
import { Button } from '../Button/Button';
import AlphabetSoup from '../../utils/Alphabet';

let numConsonants;

export class NameGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
    this.generateName = this.generateName.bind(this);
  }

  // Generate a random name when app starts
  componentDidMount() {
    this.generateName();
  }

  // Main function to build name
  generateName() {
    // Set name to random length
    const wordLength = Math.floor(Math.random() * 6) + 3;
    numConsonants = 0;
    let word = '';
    // Get a letter wordLength times
    for (let arrayIndex = 0; arrayIndex < wordLength; arrayIndex++) {
      let nextLetter = this.getNextLetter(word);
    	word += nextLetter;
    }
    // Format name to add Swedish characters if possible
    word = this.formatName(word);
    // Save name and rerender
    this.setState({
      name: word
    })
  }

  getNextLetter(word) {
    let grabAlphabet = '';
    let nextLetter = '';
    // If it's the first letter, grab any letter
    if (word.length === 0) {
      grabAlphabet = AlphabetSoup.wholeAlphabet();
      nextLetter = grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)]
    // If it's not the first letter, grab an acceptable letter based on the last letter
    } else {
      const lastLetter = word[word.length - 1];
      const methodName = 'after' + lastLetter;
      grabAlphabet = AlphabetSoup[methodName]();
      nextLetter = grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)];
    }
    // If the letter grabbed is a consonant increase counter, otherwise reset
    AlphabetSoup.justConsonants().includes(nextLetter) ? numConsonants += 1 : numConsonants = 0;
    // If there are too many consonants grab a vowel and reset counter
    if (numConsonants > 2) {
      grabAlphabet = AlphabetSoup.justVowels();
      nextLetter = grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)];
      numConsonants = 0;
    }
    return nextLetter;
  }

  formatName(word) {
    let newWord = word.replace("a", "å");
    newWord = newWord.replace("o", "ö")
    return newWord;
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
