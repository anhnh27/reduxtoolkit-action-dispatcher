/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */

import {
  CaseReducer,
  CaseReducerActions,
  CaseReducerWithPrepare,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';
import {store} from './actionDispatcherMiddleware';

type SliceCaseReducers<State> = {
  [K: string]:
    | CaseReducer<State, PayloadAction<any>>
    | CaseReducerWithPrepare<State, PayloadAction<any, string, any, any>>;
};

const createDispatcher = <State, CaseReducers extends SliceCaseReducers<State>>(
  slice: Slice<State, CaseReducers, string>,
) => {
  const actions: CaseReducerActions<CaseReducers, string> = slice.actions;
  type Dispatcher = typeof actions;
  let dispatcher = {} as Dispatcher;
  for (const action in actions) {
    if (Object.prototype.hasOwnProperty.call(actions, action)) {
      Object.defineProperty(dispatcher, action, {
        value: wrapDispatch(actions[action]),
        writable: false,
        enumerable: true,
        configurable: true,
      });
    }
  }
  return dispatcher;
};

const wrapDispatch = (creator: any) => {
  const dispatcher = (...args: any[]) => {
    const action = creator.apply(null, args);
    return store.dispatch(action);
  };
  return dispatcher;
};

export default createDispatcher;
