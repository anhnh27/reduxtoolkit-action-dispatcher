/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */

import { AnyAction, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

export let store: MiddlewareAPI<Dispatch<AnyAction>, any>;

const actionDispatcherMiddleware = (
  _store: MiddlewareAPI<Dispatch<AnyAction>, any>
) => {
  store = _store;
  return (next: Dispatch) => (action: AnyAction) => {
    next(action);
  };
};

export default actionDispatcherMiddleware;
