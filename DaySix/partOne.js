const fs = require('fs');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8' }).split('\n\n').filter(Boolean).map(line => line.split('\n').join(''));
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8' }).split('\n\n').filter(Boolean).map(line => line.split('\n').join(''));

const getCount = data => {
  let count = 0;

  for (letters of [...data]) {
    const unique = {};
    for (letter of [...letters]) {
      if (!unique[letter]) {
        unique[letter] = 1;
        count++;
      }
    }
  }
  return count;
}

console.log(getCount(testData)); // 11
console.log(getCount(allData)); // 6430
