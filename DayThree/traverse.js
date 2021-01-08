class Traverse {
  constructor(data) {
    this.data = data; // array of strings [., ., #, ., ...]
    this.x = 0; // starting at upper-left of "map"
    this.y = 0; // starting at upper-left of "map"
    this.rowLength = data[0].length; // used to determine whether we move to the next row
    this.trees = 0; // start at zero, resets after each run
    this.rounds = []; // for complex traversals (many rounds)
  }

  initTraversal(x, y) {
    while (this.y < this.getRows()) {
      this.evaluateCharacter(this.getCharacter(this.x, this.y));
      this.incrementPosition(x, y);
    }
    return this.finishTraversal();
  }

  getRows() {
    return this.data.length;
  }

  evaluateCharacter(char) {
    '#' === char.trim() && this.trees++;
  }

  getCharacter(x, y) {
    return this.data[y][x % this.rowLength];
  }

  incrementPosition(x, y) {
    this.x += x;
    this.y += y;
  }

  finishTraversal() {
    this.rounds.push(this.getTrees());

    const trees = this.getTrees();

    this.reset();

    return trees;
  }

  getTrees() {
    return this.trees;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.trees = 0;
  }

  getRounds() {
    return this.rounds.reduce(
      (acc, curr) => 
        acc === 0 ? acc : curr * acc,
      0);
  }
}

module.exports = Traverse;