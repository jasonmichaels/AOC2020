const fs = require('fs');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8'}).split('\n\n').filter(Boolean);
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8'}).split('\n\n').filter(Boolean);

const evaludateBatch = require('./Passport.js');

const testResults = evaludateBatch(testData);
console.log(testResults); // 2 valid

const allResults = evaludateBatch(allData);
console.log(allResults); // 228 valid