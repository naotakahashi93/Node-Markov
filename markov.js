/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/); // given some input text, it splits it on spaces and linebreak characters to make a list of words.
    this.words = words.filter(c => c !== ""); // allows it to call .words to an instance of new MarkovMachine and returns a list of the words from the text string. 
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() { 
    
    let chains = new Map(); // The Map object holds key-value pairs and remembers the original insertion order of the keys.

    for (let i = 0; i < this.words.length; i += 1) { // looping over all the words in the words array from the given text string
      let word = this.words[i]; // grab each word
      let nextWord = this.words[i + 1] || null; // grab the word that comes after that word or null if the word does not have another word after 

      if (chains.has(word)) {
        chains.get(word).push(nextWord);} // if the chain has the word as a key, then we get the value of word and push the nextword into that array
      else 
      chains.set(word, [nextWord]); // we are going to set the word as a key and an array containing the nextWord as a value
    }

    this.chains = chains;
  }

  /** return random text from chains */

  static choice(ar) { // a method called choice that we are defining on the class which takes in an array
    return ar[Math.floor(Math.random() * ar.length)]; // and returns the value in the array with a random indx
  }


  makeText(numWords = 100) { // numWords is the max length of the text chain we want to generate
    
    let mapKeysArr = Array.from(this.chains.keys()); // we are making an array of all the keys in the map 
    let randomKey = MarkovMachine.choice(mapKeysArr);
    let output = [];

    while (output.length < numWords && randomKey !== null){ // if the output array is less than the value of the numWords and the value of the key is not null (aka the next word for the word chosen is not null)
      output.push(randomKey); // we push that randomKey into the output array
      randomKey = MarkovMachine.choice(this.chains.get(randomKey)); // and reassign the randomKey with the value of the next word which is the value of the key
    }
    return output.join(" "); // return the array as a string with spaces in between
  }
}


module.exports = { // make this exportable
  MarkovMachine,
};