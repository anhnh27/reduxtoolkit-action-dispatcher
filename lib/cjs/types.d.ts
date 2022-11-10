/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 10 Nov 22
 */
export interface Action<T = any> {
    type: T;
}
export interface AnyAction extends Action {
    [extraProps: string]: any;
}
export declare type PrimitiveType = number | string | boolean;
export declare type AtomicObject = Function | Promise<any> | Date | RegExp;
export declare type IfAvailable<T, Fallback = void> = true | false extends (T extends never ? true : false) ? Fallback : keyof T extends never ? Fallback : T;
export declare type WeakReferences = IfAvailable<WeakMap<any, any>> | IfAvailable<WeakSet<any>>;
export declare type WritableDraft<T> = {
    -readonly [K in keyof T]: Draft<T[K]>;
};
export declare type Draft<T> = T extends PrimitiveType ? T : T extends AtomicObject ? T : T extends IfAvailable<ReadonlyMap<infer K, infer V>> ? Map<Draft<K>, Draft<V>> : T extends IfAvailable<ReadonlySet<infer V>> ? Set<Draft<V>> : T extends WeakReferences ? T : T extends object ? WritableDraft<T> : T;
export declare type CaseReducer<S = any, A extends Action = AnyAction> = (state: Draft<S>, action: A) => S | void | Draft<S>;
export declare type PayloadAction<P = void, T extends string = string, M = never, E = never> = {
    payload: P;
    type: T;
} & ([M] extends [never] ? {} : {
    meta: M;
}) & ([E] extends [never] ? {} : {
    error: E;
});
export declare type PrepareAction<P> = ((...args: any[]) => {
    payload: P;
}) | ((...args: any[]) => {
    payload: P;
    meta: any;
}) | ((...args: any[]) => {
    payload: P;
    error: any;
}) | ((...args: any[]) => {
    payload: P;
    meta: any;
    error: any;
});
export declare type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S;
export interface BaseActionCreator<P, T extends string, M = never, E = never> {
    type: T;
    match: (action: Action<unknown>) => action is PayloadAction<P, T, M, E>;
}
export interface ActionCreatorWithPreparedPayload<Args extends unknown[], P, T extends string = string, E = never, M = never> extends BaseActionCreator<P, T, M, E> {
    /**
     * Calling this {@link redux#ActionCreator} with `Args` will return
     * an Action with a payload of export type `P` and (depending on the `PrepareAction`
     * method used) a `meta`- and `error` property of types `M` and `E` respectively.
     */
    (...args: Args): PayloadAction<P, T, M, E>;
}
export declare type _ActionCreatorWithPreparedPayload<PA extends PrepareAction<any> | void, T extends string = string> = PA extends PrepareAction<infer P> ? ActionCreatorWithPreparedPayload<Parameters<PA>, P, T, ReturnType<PA> extends {
    error: infer E;
} ? E : never, ReturnType<PA> extends {
    meta: infer M;
} ? M : never> : void;
export declare type ActionCreatorForCaseReducerWithPrepare<CR extends {
    prepare: any;
}, Type extends string> = _ActionCreatorWithPreparedPayload<CR["prepare"], Type>;
export declare type SliceActionType<SliceName extends string, ActionName extends keyof any> = ActionName extends string | number ? `${SliceName}/${ActionName}` : string;
export interface ActionCreatorWithoutPayload<T extends string = string> extends BaseActionCreator<undefined, T> {
    /**
     * Calling this {@link redux#ActionCreator} will
     * return a {@link PayloadAction} of export type `T` with a payload of `undefined`
     */
    (): PayloadAction<undefined, T>;
}
export declare type IfPrepareActionMethodProvided<PA extends PrepareAction<any> | void, True, False> = PA extends (...args: any[]) => any ? True : False;
export declare type IsAny<T, True, False = never> = true | false extends (T extends never ? true : false) ? True : False;
export interface ActionCreatorWithPayload<P, T extends string = string> extends BaseActionCreator<P, T> {
    /**
     * Calling this {@link redux#ActionCreator} with an argument will
     * return a {@link PayloadAction} of export type `T` with a payload of `P`
     */
    (payload: P): PayloadAction<P, T>;
}
export declare type IsUnknown<T, True, False = never> = unknown extends T ? IsAny<T, False, True> : False;
export declare type AtLeastTS35<True, False> = [True, False][IsUnknown<ReturnType<(<T>() => T)>, 0, 1>];
export declare type IfMaybeUndefined<P, True, False> = [undefined] extends [P] ? True : False;
export declare type IfVoid<P, True, False> = [void] extends [P] ? True : False;
export declare type IsEmptyObj<T, True, False = never> = T extends any ? keyof T extends never ? IsUnknown<T, False, IfMaybeUndefined<T, False, IfVoid<T, False, True>>> : False : never;
export declare type IsUnknownOrNonInferrable<T, True, False> = AtLeastTS35<IsUnknown<T, True, False>, IsEmptyObj<T, True, IsUnknown<T, True, False>>>;
export interface ActionCreatorWithNonInferrablePayload<T extends string = string> extends BaseActionCreator<unknown, T> {
    /**
     * Calling this {@link redux#ActionCreator} with an argument will
     * return a {@link PayloadAction} of export type `T` with a payload
     * of exactly the export type of the argument.
     */
    <PT extends unknown>(payload: PT): PayloadAction<PT, T>;
}
export interface ActionCreatorWithOptionalPayload<P, T extends string = string> extends BaseActionCreator<P, T> {
    /**
     * Calling this {@link redux#ActionCreator} with an argument will
     * return a {@link PayloadAction} of export type `T` with a payload of `P`.
     * Calling it without an argument will return a PayloadAction with a payload of `undefined`.
     */
    (payload?: P): PayloadAction<P, T>;
}
export declare type PayloadActionCreator<P = void, T extends string = string, PA extends PrepareAction<P> | void = void> = IfPrepareActionMethodProvided<PA, _ActionCreatorWithPreparedPayload<PA, T>, IsAny<P, ActionCreatorWithPayload<any, T>, IsUnknownOrNonInferrable<P, ActionCreatorWithNonInferrablePayload<T>, IfVoid<P, ActionCreatorWithoutPayload<T>, IfMaybeUndefined<P, ActionCreatorWithOptionalPayload<P, T>, ActionCreatorWithPayload<P, T>>>>>>;
export declare type ActionCreatorForCaseReducer<CR, Type extends string> = CR extends (state: any, action: infer Action) => any ? Action extends {
    payload: infer P;
} ? PayloadActionCreator<P, Type> : ActionCreatorWithoutPayload<Type> : ActionCreatorWithoutPayload<Type>;
export declare type CaseReducerActions<CaseReducers extends SliceCaseReducers<any>, SliceName extends string> = {
    [Type in keyof CaseReducers]: CaseReducers[Type] extends {
        prepare: any;
    } ? ActionCreatorForCaseReducerWithPrepare<CaseReducers[Type], SliceActionType<SliceName, Type>> : ActionCreatorForCaseReducer<CaseReducers[Type], SliceActionType<SliceName, Type>>;
};
export declare type SliceDefinedCaseReducers<CaseReducers extends SliceCaseReducers<any>> = {
    [Type in keyof CaseReducers]: CaseReducers[Type] extends {
        reducer: infer Reducer;
    } ? Reducer : CaseReducers[Type];
};
export declare type CaseReducerWithPrepare<State, Action extends PayloadAction> = {
    reducer: CaseReducer<State, Action>;
    prepare: PrepareAction<Action["payload"]>;
};
export declare type SliceCaseReducers<State> = {
    [K: string]: CaseReducer<State, PayloadAction<any>> | CaseReducerWithPrepare<State, PayloadAction<any, string, any, any>>;
};
export interface Slice<State = any, CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>, Name extends string = string> {
    /**
     * The slice name.
     */
    name: Name;
    /**
     * The slice's reducer.
     */
    reducer: Reducer<State>;
    /**
     * Action creators for the types of actions that are handled by the slice
     * reducer.
     */
    actions: CaseReducerActions<CaseReducers, Name>;
    /**
     * The individual case reducer functions that were passed in the `reducers` parameter.
     * This enables reuse and testing if they were defined inline when calling `createSlice`.
     */
    caseReducers: SliceDefinedCaseReducers<CaseReducers>;
    /**
     * Provides access to the initial state value given to the slice.
     * If a lazy state initializer was provided, it will be called and a fresh value returned.
     */
    getInitialState: () => State;
}
export interface Dispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): T;
}
