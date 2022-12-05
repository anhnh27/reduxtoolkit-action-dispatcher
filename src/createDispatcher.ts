/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */

import {
  AnyAction,
  CaseReducerActions,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import {store} from './actionDispatcherMiddleware';
import {injectResultToAction} from './utils';

type PromiseResult = {
  $result: any;
};

type DispatchFunction = (...args: any[]) => AnyAction & PromiseResult;

const createDispatcher = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
>(
  slice: Slice<State, CaseReducers, Name>,
): {
  [Type in keyof CaseReducers]: DispatchFunction;
} => {
  const dispatcher = {};
  const actions: CaseReducerActions<CaseReducers, Name> = slice.actions;
  for (const action in actions) {
    if (Object.prototype.hasOwnProperty.call(actions, action)) {
      Object.defineProperty(dispatcher, action, {
        value: wrapDispatch(`${slice.name}/${action}`, actions[action]),
      });
    }
  }

  return dispatcher as {
    [Type in keyof CaseReducers]: DispatchFunction;
  };
};

const wrapDispatch = (type: string, creator: any) => {
  const dispatcher = (...args: any[]) => {
    const originalAction = creator.apply(null, args);
    let action = injectResultToAction(originalAction);
    store.dispatch(action);
    return action;
  };

  dispatcher.toString = () => type;
  dispatcher.type = type;

  return dispatcher;
};

export default createDispatcher;
