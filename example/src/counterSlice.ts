import {createDispatcher} from '@anhnh27/reduxtoolkit-action-dispatcher';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {all, call, fork, takeLatest} from 'redux-saga/effects';

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    update: (state, _action: PayloadAction<string>) => state,
  },
});

export const counterDispatcher = createDispatcher(counterSlice);

const fakeApiRequest = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
};

function* counterSagaWorker({$result}: any) {
  console.log('counterSagaWorker called');
  yield call(fakeApiRequest);
  $result.value = true;
}

function* counterSaga() {
  yield takeLatest(counterDispatcher.update.toString(), counterSagaWorker);
}

export function* rootSaga() {
  yield all([fork(counterSaga)]);
}

export default counterSlice.reducer;
