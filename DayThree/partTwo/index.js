const fs = require('fs');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8'}).split('\n').filter(Boolean).map(d => [...d]);
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8'}).split('\n').filter(Boolean).map(d => [...d]);

const Traverse = require('../traverse.js');

const initComplexTraversal = (instance, coordinates) => {
  if (instance instanceof Traverse) {
    for (let coords of coordinates) {
      if ('function' === typeof instance.initTraversal) {
        instance.initTraversal(coords[0], coords[1]);
      }
    }
    if ('function' === typeof instance.getRounds) {
      return instance.getRounds();
    }
  }
}

const coordinates = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];

const testTrees = new Traverse(testData);
const testResult = initComplexTraversal(testTrees, coordinates);
console.log(testResult); // 336

const allTrees = new Traverse(allData);
const result = initComplexTraversal(allTrees, coordinates);
console.log(result); // 3510149120