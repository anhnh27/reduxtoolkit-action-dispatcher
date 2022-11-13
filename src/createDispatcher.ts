/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */

import {CaseReducerActions, Slice, SliceCaseReducers} from '@reduxjs/toolkit';
import {store} from './actionDispatcherMiddleware';
import Concurrency from './Concurrency';
import {injectResultToAction} from './utils';

type DispatchFunction = (...args: any[]) => any;

type PromiseResult = {
  $result: any;
};

export type ActionWithPromise<D extends DispatchFunction> = (
  ...args: Parameters<D>
) => ReturnType<D> & PromiseResult;

const createDispatcher = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
>(
  slice: Slice<State, CaseReducers, Name>,
): {
  [Type in keyof CaseReducers]: CaseReducers[Type] & ActionWithPromise<any>;
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

  return dispatcher as unknown as {
    [Type in keyof CaseReducers]: CaseReducers[Type] & ActionWithPromise<any>;
  };
};

const wrapDispatch = (type: string, creator: any) => {
  const dispatcher = (...args: any[]) => {
    const payload = creator.apply(null, args);

    let action = injectResultToAction({
      type: payload.type,
      ...payload,
    });

    action = Concurrency.injectResult(action);
    store.dispatch(action);
    return action;
  };

  dispatcher.toString = () => type;
  dispatcher.type = type;

  return dispatcher;
};

export default createDispatcher;
