const fs = require('fs');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8' }).split('\n\n').filter(Boolean);
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8' }).split('\n\n').filter(Boolean);

const getCount = data => {
  return data.reduce((acc, curr) =>
    acc + [...new Set([...curr.replace(/\n/g, '')])] // get unique letters
    .filter(c => curr.split('\n')
      .filter(Boolean)
      .every(d => d.includes(c))) // every one should contain the same letter, else ditch it
    .length,
    0);
};

console.log(getCount(testData)); // 6
console.log(getCount(allData)); // 3125
