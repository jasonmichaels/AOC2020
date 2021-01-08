const fs = require('fs');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8' }).split('\n').filter(Boolean);
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8' }).split('\n').filter(Boolean);