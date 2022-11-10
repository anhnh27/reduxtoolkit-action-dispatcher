import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import createDispatcher from './createDispatcher';

export interface CounterState {
  value: number;
  form: {
    text: string;
  };
}

const initialState: CounterState = {
  value: 0,
  form: {
    text: '',
  },
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    saveForm: (state, action: PayloadAction<{text: string}>) => {
      state.form = action.payload;
    },
  },
});

export const counterDispatcher = createDispatcher(counterSlice);

export default counterSlice.reducer;
