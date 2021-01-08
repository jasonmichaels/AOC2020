const fs = require('fs');
const SeatFinder = require('./SeatFinder.js');

const testData = fs.readFileSync('test.txt', { encoding: 'UTF-8' }).split('\n').filter(Boolean);
const allData = fs.readFileSync('data.txt', { encoding: 'UTF-8' }).split('\n').filter(Boolean);

for (seat of testData) {
  const seatFinder = new SeatFinder(seat).initSeatFinder();
  console.log(seatFinder); // 357, 567, 119, 820
}

let highest = 0;

for (seat of allData) {
  const seatFinder = new SeatFinder(seat).initSeatFinder();
  
  if (seatFinder > highest) {
    highest = seatFinder;
  }
}

console.log(highest); // 953

