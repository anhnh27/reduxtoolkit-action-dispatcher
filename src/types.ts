import {
  ActionCreatorWithoutPayload,
  AnyAction,
  PayloadActionCreator,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithPreparedPayload,
  _ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit/dist/createAction";

type PromiseResult = {
  $result: any;
};

type ActionCreatorForCaseReducerWithPrepare<
  CR extends {
    prepare: any;
  },
  Type extends string
> = _ActionCreatorWithPreparedPayload<CR["prepare"], Type>;

export type SliceActionType<
  SliceName extends string,
  ActionName extends keyof any
> = ActionName extends string | number ? `${SliceName}/${ActionName}` : string;

export type CaseReducerActions<
  CaseReducers extends SliceCaseReducers<any>,
  SliceName extends string
> = {
  [Type in keyof CaseReducers]: CaseReducers[Type] extends {
    prepare: any;
  }
    ? ActionCreatorForCaseReducerWithPrepare<
        CaseReducers[Type],
        SliceActionType<SliceName, Type>
      >
    : ActionCreatorForCaseReducer<
        CaseReducers[Type],
        SliceActionType<SliceName, Type>
      >;
};

export type ActionCreatorForCaseReducer<CR, Type extends string> = CR extends (
  state: any,
  action: infer Action
) => any
  ? Action extends {
      payload: infer P;
    }
    ? PayloadActionCreator<P, Type>
    : ActionCreatorWithoutPayload<Type>
  : ActionCreatorWithoutPayload<Type>;

export type ActionCreator<Name extends string, CaseReducers> =
  | void
  | ActionCreatorWithPreparedPayload<
      unknown[],
      unknown,
      SliceActionType<Name, Extract<keyof CaseReducers, string>>,
      unknown,
      unknown
    >
  | ActionCreatorWithoutPayload<any>
  | ActionCreatorWithPayload<any>;

export type DispatchFunction<Type extends string, CR> = (
  ...payload: Parameters<ActionCreatorForCaseReducer<CR, Type>>
) => AnyAction & PromiseResult;
