import { createSlice } from "@reduxjs/toolkit";

interface counterSliceType {
  value: number;
}

const initialState: counterSliceType = {
  value: 0,
};
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    handlAdd: (state) => {
      state.value += 1;
    },
    handleMinus: (state) => {
      state.value -= 1;
    },
    handlAddByAmont: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { handlAdd } = counterSlice.actions;
export const { handleMinus } = counterSlice.actions;
export const { handlAddByAmont } = counterSlice.actions;

export const counterReducer = counterSlice.reducer;
