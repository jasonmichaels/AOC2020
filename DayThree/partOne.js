const fs = require('fs');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8'}).split('\n').filter(Boolean).map(d => [...d]);
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8'}).split('\n').filter(Boolean).map(d => [...d]);

const Traverse = require('./traverse.js');

const testTrees = new Traverse(testData).initTraversal(3, 1);
console.log(testTrees); // 7

const allTrees = new Traverse(allData).initTraversal(3, 1);
console.log(allTrees); // 284
