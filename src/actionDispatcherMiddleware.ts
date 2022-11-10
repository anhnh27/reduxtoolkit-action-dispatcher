/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */

import { AnyAction, Dispatch } from "./types";

interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;
  getState(): S;
}

export let store: MiddlewareAPI;

const actionDispatcherMiddleware = (
  _store: MiddlewareAPI<Dispatch<AnyAction>, any>
) => {
  store = _store;
  return (next: Dispatch) => (action: AnyAction) => {
    next(action);
  };
};

export default actionDispatcherMiddleware;
