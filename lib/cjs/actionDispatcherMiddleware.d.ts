/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */
import { AnyAction, Dispatch } from "./types";
interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
    dispatch: D;
    getState(): S;
}
export declare let store: MiddlewareAPI;
declare const actionDispatcherMiddleware: (_store: MiddlewareAPI<Dispatch<AnyAction>, any>) => (next: Dispatch) => (action: AnyAction) => void;
export default actionDispatcherMiddleware;
