export class Field {
  constructor(fieldElement) {
    this._cells = fieldElement.querySelectorAll(".cell");
  }

  startGame() {
    this._currentCellIndex = null;
    this._interval = setInterval(this._changeCell.bind(this), 1000);
  }

  stopGame() {
    clearInterval(this._interval);
  }

  _changeCell() {
    if (this._currentCellIndex !== null) {
      this._toggleCell(this._currentCellIndex);
    }
    const newIndex = this._getNewCellIndex();
    this._toggleCell(newIndex);
    this._currentCellIndex = newIndex;
  }

  _getNewCellIndex() {
    let randInt = this._randomInteger(0, this._cells.length - 1);
    while (this._currentCellIndex == randInt) {
      randInt = this._randomInteger(0, this._cells.length - 1);
    }
    return randInt;
  }

  _randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  _toggleCell(cellIndex) {
    const currentCell = this._cells[cellIndex];
    currentCell.classList.toggle("hidden");
  }
}
