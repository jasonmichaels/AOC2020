const utils = require('./utils.js');

const {
  getRange,
  splitSeat,
  evalSeats
} = utils;

// unused
class Seat {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.id = row * 8 + column;
  }

  getPosition() {
    return [this.row, this.column];
  }

  getId() {
    return this.id;
  }
}

/**
 * @param {String} seat 'FBFFBBFBRLR', etc.
 * @returns {Number} unique seat ID (row * 8 + column)
 */
class SeatFinder {
  constructor(seat) {
    this.seat = seat;
    this.map = [];
    this.row = null;
    this.seats = null;
  }

  initSeatFinder() {
    this.buildRowsAndColumns();
    this.traverseRows();
    this.traverseColumn();
    return +this.row * 8 + +this.seats;
  }

  buildRowsAndColumns() {
    const rows = getRange(127, [1, 2, 3, 4, 5, 6, 7]);
    let row = 0;

    while (rows.length) {
      this.map.push({ row: row + 1, seats: [...rows.slice(0, 7)] });
      rows.splice(0, 7);
      row++;
    }
  }

  traverseRows() {
    const characters = splitSeat(this.seat, 0, 7);

    for (let i = 0; i < characters.length; i++) {
      this.map = evalSeats(this.map, 'F', 'B', i, characters);

      if (this.map.length === 1) {
        this.row = this.map[0].row;
        this.seats = this.map[0].seats;
        break;
      }
    }
  }

  traverseColumn() {
    const characters = splitSeat(this.seat, 7, 10);

    for (let i = 0; i < characters.length; i++) {
      if (this.seats.length === 1) {
        this.seats = this.seats[0];
        break;
      }
      this.seats = evalSeats(this.seats, 'L', 'R', i, characters);
    }
  }
}

module.exports = SeatFinder;