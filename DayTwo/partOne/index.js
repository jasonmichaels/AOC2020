const fs = require('fs');

const testEntries = fs.readFileSync('test.txt', { encoding: 'UTF-8'}).split('\n').filter(x => !!x);
const allEntries = fs.readFileSync('data.txt', { encoding: 'UTF-8'}).split('\n').filter(x => !!x)

const findValidPasswords = entries => {
  
  return entries.reduce((acc, entry) => {
    const validation = {};
    const [_, min, max, letter, pw] = /^(\d+)-(\d+) (.): (.*)$/.exec(entry);
    /**
     * exec returns array of:
     *  _: entire entry string (unused)
     * min: first digit in 'X-Y' string
     * max: second digit in 'X-Y' string
     * letter: string immediately preceding colon
     * pw: string immediately following colon
     */
  
    for (char of pw) {
      // if we haven't added anything to the object yet, set it to zero
      if (!validation[char]) {
        validation[char] = 0;
      }
      // else, we've got zero, increment it
      validation[char]++;
    }

    // if the validation integer is greater than or equal to the min and less than or equal to max,
    // return accumulator + 1 --> found a valid password entry
    if (validation[letter] >= min && validation[letter] <= max) {
      return acc + 1;
    }
    // else just return the accumulator
    return acc;
    // start at zero
  }, 0)
}

console.log(findValidPasswords(testEntries)); // 2 valid
console.log(findValidPasswords(allEntries)); // 643 valid