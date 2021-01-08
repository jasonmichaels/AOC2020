const getRange = (to, content) => {
  return Array.from({ length: to }).fill(content).flat(); // [ [...], [...], ...]
}

const splitSeat = (seat, start, end) => {
  return [...seat].slice(start, end);
}

const evalSeats = (arr, lower, upper, i, characters) => {
  if (characters[i] === lower) {
    arr = getLower(arr);
  } else if (characters[i] === upper) {
    arr = getUpper(arr);
  }
  return arr;
}

const getLower = (arr) => {
  return arr.slice(0, arr.length / 2);
}

const getUpper = (arr) => {
  return arr.slice(arr.length / 2, arr.length);
}

module.exports = {
  getRange,
  splitSeat,
  evalSeats,
  getLower,
  getUpper
};