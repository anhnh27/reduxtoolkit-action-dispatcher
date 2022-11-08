export type ActionCreator = {
  name: string;
  type: string;
  actionCreator: (payload: any) =>
    | {
        type: string;
        payload: any;
      }
    | Object;
};

export type MapDispatchToAC = {
  [key: string]: ActionCreator;
};

export type ActionWrapper = {
  type: string;
  actionCreator?: ActionCreator;
};

const createActions = (key: string, mapDispatchToAC: MapDispatchToAC) => {
  const actionCreator: ActionWrapper[] = [];
  for (const action in mapDispatchToAC) {
    if (Object.prototype.hasOwnProperty.call(mapDispatchToAC, action)) {
      if (typeof mapDispatchToAC[action] === "function") {
        const actionType = `${key}/${mapDispatchToAC[action].name}`;
        actionCreator.push({
          type: actionType,
          actionCreator: mapDispatchToAC[action],
        });
      } else {
        const actionType = `${key}/${action}`;
        actionCreator.push({
          type: actionType,
        });
      }
    }
  }
  return actionCreator;
};

export default createActions;
