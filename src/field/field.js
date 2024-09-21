export class Field {
  constructor(fieldElement) {
    this._cells = fieldElement.querySelectorAll(".cell");
    this.scoreCounterElement = document.querySelector('.scoreCounter');
    this.livesCounterElement = document.querySelector('.livesCounter');

    this.onCellClick = this.onCellClick.bind(this);
    fieldElement.addEventListener('click', this.onCellClick);
  }

  startGame() {
    this._currentCellIndex = null;
    this.scoreCounter = 0;
    this._counter = 0;
    this.livesCounter = 5;
    this._updateScoreCounter();
    this._updateLivesCounter();
    this._interval = setInterval(this._changeCell.bind(this), 1000);
  }

  stopGame() {
    if (this._currentCellIndex !== null) {
      this._hideCell(this._currentCellIndex);
    }
    clearInterval(this._interval);
  }

  onCellClick(e) {
    const element = e.target.closest('.cell');
    if (element && !element.classList.contains('hidden')) {
      element.classList.toggle("hidden");
      this.scoreCounter++;
      this._updateScoreCounter();
    }
  }

  _updateLivesCounter() {
    this.livesCounterElement.innerHTML = this.livesCounter;
  }

  _updateScoreCounter() {
    this.scoreCounterElement.innerHTML = this.scoreCounter;
  }

  _changeCell() {
    let failsCount = this._counter - this.scoreCounter;
    if (failsCount >= 5) {
      this.stopGame();
      this.livesCounter--;
      this._updateLivesCounter();
      return
    }
    if (5 - failsCount != this.livesCounter) {
      this.livesCounter--;
      this._updateLivesCounter();
    }
    if (this._currentCellIndex !== null) {
      this._hideCell(this._currentCellIndex);
    }
    const newIndex = this._getNewCellIndex();
    this._showCell(newIndex);
    this._currentCellIndex = newIndex;
    this._counter++;
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

  _hideCell(cellIndex) {
    const currentCell = this._cells[cellIndex];
    if (!currentCell.classList.contains('hidden')) {
      currentCell.classList.add('hidden');
    }
  }

  _showCell(cellIndex) {
    const currentCell = this._cells[cellIndex];
    if (currentCell.classList.contains('hidden')) {
      currentCell.classList.remove('hidden');
    }
  }
}
