import React, { Component } from 'react';
import './NameGenerator.css';
import { Name } from '../Name/Name';
import { Button } from '../Button/Button';
import AlphabetSoup from '../../utils/Alphabet';

let numConsonants = 0;

export class NameGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.generateName = this.generateName.bind(this);
  }

  // Generate a random name when app starts
  componentDidMount() {
    this.generateName();
  }

  // Main function to build name
  generateName() {
    // Pick random word length between 3 and 9 characters
    const wordLength = Math.floor(Math.random() * 6) + 3;
    let word = '';

    // Generate each letter wordLength times
    for (let arrayIndex = 0; arrayIndex < wordLength; arrayIndex++) {
      let nextLetter = this.returnNextLetter(word);
    	word += nextLetter;
    }
    // Format name to add Swedish characters if possible
    word = this.formatName(word);
    // Save name and rerender
    this.setState({
      name: word
    })
  }

  // Main function to get and return the next letter
  returnNextLetter(word) {
    let nextLetter;

    // If it's the first letter, grab any letter
    if (word.length === 0) {
      nextLetter = this.grabAnyLetter();
    // If it's not the first letter...
    // And there are too many consonants before it, grab a vowel
    } else if (numConsonants === 2) {
      nextLetter = this.grabAVowel();
    // Otherwise, grab the next acceptable letter
    } else {
      nextLetter = this.grabNextGoodLetter(word);
    }
    // Increase consonant counter if letter is a consonant, reset it if letter is a vowel
    AlphabetSoup.justConsonants().includes(nextLetter) ? numConsonants += 1 : numConsonants = 0;
    return nextLetter;
  }

  //===== FUNCTIONS THAT GET THE NEXT LETTER
  // Get any letter from alphabet
  grabAnyLetter() {
    let grabAlphabet = AlphabetSoup.wholeAlphabet();
    return grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)]
  }
  // Get just a vowel
  grabAVowel() {
    let grabAlphabet = AlphabetSoup.justVowels();
    return grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)]
  }
  // Get a letter than can follow the last letter
  grabNextGoodLetter(word) {
    const lastLetter = word[word.length - 1];
    const methodName = 'after' + lastLetter;
    let grabAlphabet = AlphabetSoup[methodName]();
    return grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)];
  }
  //===== END FUNCTIONS THAT GET NEXT LETTER

  // Change first a and o (if present) to swedish characters
  formatName(word) {
    return word.replace("a", "å").replace("o", "ö");
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
