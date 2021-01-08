const fs = require('fs');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8'}).split('\n\n').filter(Boolean);
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8'}).split('\n\n').filter(Boolean);

const evaludateBatch = require('../Passport.js');

console.log('PROCESSING TEST DATA WITH LENGTH: ', testData.length);
console.time('TestBatch');
const testResults = evaludateBatch(testData);
console.log(testResults); // 2 valid
console.timeEnd('TestBatch');

console.log('PROCESSING DATA WITH LENGTH: ', allData.length);
console.time('AllDataBatch');
const allResults = evaludateBatch(allData, true);
console.log(allResults); // 175 valid
console.timeEnd('AllDataBatch');