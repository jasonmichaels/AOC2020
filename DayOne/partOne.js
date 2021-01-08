const fs = require('fs');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8'}).split('\n').filter(l => !!l).map(Number);
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8'}).split('\n').filter(l => !!l).map(Number);

const getTotal = ([x, y]) => x * y;

const findTarget = (data) => {
  /**
   * This creates an array of arrays, with each nested array consisting of a combination,
   * and is more performant than calling [].map().flat()
   * 
   * - finally filters by values that total 2020
   */
  const numbers = data.flatMap(i => data.map(j => [i, j])).filter(x => (x[0] + x[1]) === 2020);

  /**
   * Sanity check: do we have an array of arrays? Get the total of the first array (this assumes
   * the other combinations are just arranged differently [123, 456], [456, 123]). 
   * Else, something's borked.
   */
  return numbers.length && Array.isArray(numbers[0]) ? getTotal(numbers[0]) : 0;
}

console.log(findTarget(testData));
console.log(findTarget(allData));