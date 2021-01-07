const fs = require('fs');

const testEntries = fs.readFileSync('test.txt', { encoding: 'UTF-8'}).split('\n').filter(x => !!x);
const allEntries = fs.readFileSync('data.txt', { encoding: 'UTF-8'}).split('\n').filter(x => !!x)

const findValidPasswords = entries => {
  
  return entries.reduce((acc, entry) => {
    const [_, min, max, letter, pw] = /^(\d+)-(\d+) (.): (.*)$/.exec(entry);
    /**
     * exec returns array of:
     *  _: entire entry string (unused)
     * min: first digit in 'X-Y' string
     * max: second digit in 'X-Y' string
     * letter: string immediately preceding colon
     * pw: string immediately following colon
     */
  
    if ((pw[min - 1] === letter) ^ (pw[max - 1] === letter)) {
      return acc + 1;
    }
    return acc;
  }, 0)
}

console.log(findValidPasswords(testEntries)); // 1 valid
console.log(findValidPasswords(allEntries)); // 388 valid