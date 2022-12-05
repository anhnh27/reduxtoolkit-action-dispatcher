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
import { createDispatcher } from "@anhnh27/reduxtoolkit-action-dispatcher";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    update: (state, action: PayloadAction<{ text: string }>) => state,
  },
});

export const counterSlice = createSlice({
  name: "counter",
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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
};

function* counterSagaWorker({ $result }: any) {
  console.log("counterSagaWorker called");
  yield call(fakeApiRequest);
  $result.value = true;
}

//Test.tsx
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { counterDispatcher } from "./counterSlice";

const TestDispatcher = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await counterDispatcher.update("Hello wolrd").$result;
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    counterDispatcher.incrementByAmount(10);
  }, []);

  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }

  return null;
};

export default TestDispatcher;
```

### TODO:
