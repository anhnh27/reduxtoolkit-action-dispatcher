/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */

interface Action<T = any> {
  type: T;
}

interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T;
}

interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;
  getState(): S;
}

export let store: MiddlewareAPI;

const actionDispatcherMiddleware = (
  _store: MiddlewareAPI<Dispatch<AnyAction>, any>,
) => {
  store = _store;
  return (next: Dispatch) => (action: AnyAction) => {
    next(action);
  };
};

export default actionDispatcherMiddleware;
