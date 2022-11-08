/**
 * CreatedBy: Hoang Anh Nguyen
 * Date: 08 Nov 22
 */

import { store } from "./actionDispatcherMiddleware";

export default function createDispatcher(actions: any) {
  const facade = {};
  for (const action in actions) {
    if (Object.prototype.hasOwnProperty.call(actions, action)) {
      const { type } = actions[action];
      const actionName = type.toString().split("/")[1];
      facade[actionName] = wrapDispatch(type, actions[action].actionCreator);
    }
  }
  return facade;
}

const wrapDispatch = (type: string, creator: any) => {
  const dispatcher = (...args: any) => {
    const payload =
      typeof creator === "function" ? creator.apply(null, args) : creator;

    const action = {
      type: payload?.type || type,
      payload,
    };
    return store.dispatch(action);
  };

  dispatcher.name = dispatcher.toString = () => type;
  dispatcher.type = type;

  return dispatcher;
};
