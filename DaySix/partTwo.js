const fs = require('fs');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8' }).split('\n\n').filter(Boolean);
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8' }).split('\n\n').filter(Boolean);

const getCount = data => data.reduce((acc, curr) =>
  acc + [...new Set([...curr.replace(/\n/g, '')])]
  .filter(c => curr.split('\n')
    .filter(Boolean)
    .every(d => d.includes(c)))
  .length,
  0);

console.log(getCount(testData)); // 6
console.log(getCount(allData)); // 3125
