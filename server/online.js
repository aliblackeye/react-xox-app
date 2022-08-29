const initialState = {
  isStarted: false,
  gameTable: [null, null, null, null, null, null, null, null, null],
  turn: null,
  winner: null,
  counter: 0,
};

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gameStatus = (action) => {
  initialState.isStarted = action;
};

const changeTurn = (turn) => {
  if (turn) {
    initialState.turn = turn;
  }
};

const changeTable = ({ index, symbol }) => {
  initialState.gameTable[index] = symbol;
};

const changeWinner = (action) => {
  initialState.winner = action;
};

const resetGame = () => {
  initialState.gameTable = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  initialState.isStarted = false;
  initialState.turn = null;
  initialState.winner = null;
  initialState.counter = 0;
};

const setCounter = (action) => {
  initialState.counter = action;
};

module.exports = {
  gameStatus,
  changeTurn,
  changeTable,
  changeWinner,
  resetGame,
  setCounter,
  winPatterns,
  initialState,
};
