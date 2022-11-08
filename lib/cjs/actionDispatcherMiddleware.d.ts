/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */
interface Action<T = any> {
    type: T;
}
interface AnyAction extends Action {
    [extraProps: string]: any;
}
interface Dispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): T;
}
interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
    dispatch: D;
    getState(): S;
}
export declare let store: MiddlewareAPI<Dispatch<AnyAction>, any>;
declare const actionDispatcherMiddleware: (_store: MiddlewareAPI<Dispatch<AnyAction>, any>) => (next: Dispatch) => (action: AnyAction) => void;
export default actionDispatcherMiddleware;
