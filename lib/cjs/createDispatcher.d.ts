/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */
import { CaseReducerActions, Slice, SliceCaseReducers } from "./types";
declare const createDispatcher: <State, CaseReducers extends SliceCaseReducers<State>>(slice: Slice<State, CaseReducers, string>) => CaseReducerActions<CaseReducers, string>;
export default createDispatcher;
