# reduxtoolkit-action-dispatcher

Dispatch redux actions without useDispatch or mapDispatchToProps.

## Install

```js
yarn add "@anhnh27/reduxtoolkit-action-dispatcher"
```

### Setup

```js
import actionDispatcherMiddleware from "@anhnh27/reduxtoolkit-action-dispatcher";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: counterReducer,
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware().concat(actionDispatcherMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
```

### Usage

```js

//counterSlice.ts
import {createDispatcher} from '@anhnh27/reduxtoolkit-action-dispatcher';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

interface CounterState {
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

//Test.tsx
import {useEffect} from 'react';
import {counterDispatcher} from './counterSlice';

const TestDispatcher = () => {
  useEffect(() => {
    counterDispatcher.saveForm({text: 'Sir Alex'});
    counterDispatcher.incrementByAmount(10);
  }, []);

  return null;
};

export default TestDispatcher;
```

### TODO:

- manage peerDependency automatically
