const fs = require('fs');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8' }).split('\n').filter(Boolean);
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8' }).split('\n').filter(Boolean);

class SeatValidatorDos {
  constructor(data) {
    this.data = data;
    this.uniqueIds = null;
  }

  init() {
    this.parseData();

    return this.getSeat();
  }

  parseData() {
    const { data } = this;
    const uniqueIds = data.map(datum => {

      const [row, column] = this.splitString(datum);
      const rowNum = this.binarySearch(row, 'F', 'B', 128);
      const columnNum = this.binarySearch(column, 'L', 'R', 8);

      return this.getUniqueId(rowNum, columnNum);
    });
    this.uniqueIds = uniqueIds;
  }

  splitString(datum) {
    return datum.match(/.{1,7}/g);
  }

  getUniqueId(rowNum, columnNum) {
    return (rowNum * 8) + columnNum;
  }

  binarySearch(str, lower, upper, max) {
    let low = 0;
    let hi = max;
  
    for (const letter of str) {
      const middle = Math.floor((low + hi) / 2);
  
      if (letter === lower) {
        hi = middle;
      } else if (letter === upper) {
        low = middle;
      }
    }
    return low;
  }

  getSeat() {
    const { uniqueIds } = this;

    let seatId = 0;

    for (let i = 0; i < uniqueIds.length - 1; i++) {
      if (uniqueIds[i + 1] - uniqueIds[i] > 1) {
        seatId = uniqueIds[i] + 1;
        break;
      }
    }
    return seatId;
  }
}

const testValidator = new SeatValidatorDos(testData).init();
console.log(testValidator); // 120
const allDataValidator = new SeatValidatorDos(allData).init();
console.log(allDataValidator); // 615