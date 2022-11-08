/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */
import { AnyAction, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
export declare let store: MiddlewareAPI<Dispatch<AnyAction>, any>;
declare const actionDispatcherMiddleware: (_store: MiddlewareAPI<Dispatch<AnyAction>, any>) => (next: Dispatch) => (action: AnyAction) => void;
export default actionDispatcherMiddleware;
