import {configureStore} from '@reduxjs/toolkit';
import actionDispatcherMiddleware from './actionDispatcherMiddleware';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: counterReducer,
  middleware: curryGetDefaultMiddleware =>
    curryGetDefaultMiddleware().concat(actionDispatcherMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
