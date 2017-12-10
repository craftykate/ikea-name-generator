import React, { Component } from 'react';
import './NameGenerator.css';
import { Name } from '../Name/Name';
import { Description } from '../Description/Description';
import { Button } from '../Button/Button';
import AlphabetSoup from '../../utils/Alphabet';

let numConsonants;
let numVowels;

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
    numConsonants = 0;
    numVowels = 0;
    // Pick random word length between 3 and 9 characters
    const wordLength = Math.floor(Math.random() * 6) + 3;
    let word = '';

    // Generate each letter wordLength times
    for (let arrayIndex = 0; arrayIndex < wordLength; arrayIndex++) {
    	word += this.returnNextLetter(word);
    }
    // Checks if word ended with two consonants. For readability, end with an extra vowel
    word = this.endWord(word);
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
    // Or it's the second letter and the first wasn't a vowel (this makes sure there's a vowel in the first two letters for readability)
    } else if (numConsonants === 2 || (word.length === 1 && numConsonants === 1)) {
      nextLetter = this.grabAVowel();
    // Or if there are too many vowels grab a consonant
    } else if (numVowels === 3){
      nextLetter = this.grabAConsonant();
    // Otherwise, grab the next acceptable letter
    } else {
      nextLetter = this.grabNextGoodLetter(word);
    }
    // Increase/reset consonant and vowel counters appropriately
    this.increaseCounters(nextLetter);
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
  // Get just a consonant
  grabAConsonant() {
    let grabAlphabet = AlphabetSoup.justConsonants();
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

  // Increase/reset consonant and vowel counters appropriately
  increaseCounters(nextLetter) {
    if (AlphabetSoup.justVowels().includes(nextLetter)) {
      numConsonants = 0;
      numVowels += 1;
    } else {
      numConsonants += 1;
      numVowels = 0;
    }
  }

  // For readability, make sure word has a vowel in the last two letters
  endWord(word) {
    let lastLetters = word.slice(-2);
    if (!AlphabetSoup.justVowels().includes(lastLetters[0]) && !AlphabetSoup.justVowels().includes(lastLetters[1])) {
      word += this.grabAVowel();
    }
    return word;
  }

  // Change first a and o (if present) to swedish characters
  formatName(word) {
    return word.replace("a", "å").replace("o", "ö");
  }

  render() {
    return (
      <div className="nameBox" >
        <Name name={this.state.name} />
        <Description key={this.state.name}/>
        <Button onClick={this.generateName} />
      </div>
    );
  }
}
