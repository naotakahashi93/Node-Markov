/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generateMarkovText(text){
    let mmtext = new markov.MarkovMachine(text); // create new class of MarkovMachine from markov file that we imported
    console.log(mmtext.makeText()) // call the method .makeText() that makes the random string of text 
}

//function to read files from eggs.txt
function makeText(path){
    fs.readFile(path, "utf8", function cb(err, data) {
        if (err) {
          console.error(`Cannot read file: ${path}: ${err}`); // handle error we cant open the file specified
          process.exit(1);
        } else {
            generateMarkovText(data); // if it works then we call the generateMarkovText() function to make the randomtext from the path data we passed in
        }
      });

}

// function to read files from URL using axios
async function makeTextURL(url){
    let resp;
    try{
        resp = await axios.get(url);
    }
    catch (err){
        console.log("Error! Cannot read!", err)
        process.exit(1)
    }
    generateMarkovText(resp.data)
}


let path = process.argv[2]
if (path.slice(0,4) === "http"){
    makeTextURL(path)
}
else{
    makeText(path)
}

module.exports = { // make this exportable
    makeText,

  };