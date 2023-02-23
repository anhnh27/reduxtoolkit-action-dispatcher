/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */
import { CaseReducerActions, Slice, SliceCaseReducers } from "@reduxjs/toolkit";
import { store } from "./actionDispatcherMiddleware";
import { ActionCreator, DispatchFunction } from "./types";
import { injectResultToAction } from "./utils";

const createDispatcher = <
  Name extends string,
  ReducerState,
  CaseReducers extends SliceCaseReducers<ReducerState>
>(
  slice: Slice<ReducerState, CaseReducers, Name>
) => {
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
    [Key in keyof CaseReducerActions<CaseReducers, Name>]: DispatchFunction<
      Name,
      CaseReducers[Key]
    >;
  };
};

const wrapDispatch = <
  Name extends string,
  ReducerState,
  CaseReducers extends SliceCaseReducers<ReducerState>
>(
  type: string,
  creator: ActionCreator<Name, CaseReducers>
) => {
  const dispatcher = (...args: any[]) => {
    const originalAction = (creator as Function).apply(null, args);
    let action = injectResultToAction(originalAction);
    store.dispatch(action);
    return action;
  };

  dispatcher.toString = () => type;
  dispatcher.type = type;

  return dispatcher;
};

export default createDispatcher;
