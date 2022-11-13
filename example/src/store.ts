import actionDispatcherMiddleware from '@anhnh27/reduxtoolkit-action-dispatcher';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import counterReducer, {rootSaga} from './counterSlice';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [actionDispatcherMiddleware, sagaMiddleware];
export const store = configureStore({
  reducer: counterReducer,
  middleware: curryGetDefaultMiddleware =>
    curryGetDefaultMiddleware().concat(middlewares),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
