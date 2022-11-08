/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */

import { store } from "./actionDispatcherMiddleware";

export default function createDispatcher(slice) {
  const { actions } = slice;
  for (const action in actions) {
    if (Object.prototype.hasOwnProperty.call(actions, action)) {
      actions[action] = wrapDispatch(actions[action]);
    }
  }
  return actions;
}

const wrapDispatch = (creator) => {
  const dispatcher = (...args) => {
    const action = creator.apply(null, args);
    return store.dispatch(action);
  };

  return dispatcher;
};
