const markov = require("./makeText");

test("testing markov functions", function(){
    let pass = ["eggs.txt"]
    let result = markov.makeText(pass);
    expect(result).toEqual(expect.any(String))
})