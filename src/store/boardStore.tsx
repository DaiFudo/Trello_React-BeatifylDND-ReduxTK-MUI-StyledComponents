import { createSlice } from "@reduxjs/toolkit";

export const board = createSlice({
  name: "task",
  // initialState: {
  //     title: '',
  //     idForm: '',
  //     idInput: '',
  //     task: [],
  // },
  initialState: {
    cards: [{ "123": ["dfgdjfg", "dfbvgdf"] }],
  },
  reducers: {
    /* changeCards: (state, payload) => {
            const a = cards.findIndex(item => item.id === payload.id)
            cards.splice();
            const a = cards.findIndex(item => item.id === payload.idNew)

        }, */
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    getDefaultValue: (state) => {
      state.value = 0;
    },
  },
});
export const { increment, decrement, incrementByAmount, getDefaultValue } =
  board.actions;
export const selectCount = (state) => state.counter.value;
export default board.reducer;
