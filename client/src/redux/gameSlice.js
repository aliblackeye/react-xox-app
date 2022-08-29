import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isStarted: false,
  gameTable: [null, null, null, null, null, null, null, null, null],
  turn: null,
  winner: null,
  counter: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gameStatus: (state, action) => {
      state.isStarted = action.payload;
    },
    changeTurn: (state, action) => {
      if (action.payload) {
        state.turn = action.payload;
      } else if (state.turn === "p1") {
        state.turn = "p2";
      } else if (state.turn === "p2") {
        state.turn = "p1";
      }
    },
    changeTable: (state, action) => {
      state.gameTable[action.payload.index] = action.payload.string;
    },
    changeWinner: (state, action) => {
      state.winner = action.payload;
    },
    resetTable: (state) => {
      state.gameTable = [null, null, null, null, null, null, null, null, null];
    },
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
  },
});

export const {
  gameStatus,
  changeTurn,
  changeTable,
  changeWinner,
  resetTable,
  setCounter,
} = gameSlice.actions;

export default gameSlice.reducer;
