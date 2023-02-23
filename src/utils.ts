import { AnyAction } from "@reduxjs/toolkit";

export const injectResultToAction = (action: AnyAction) => {
  let callback: Function;

  const getResult = () => {
    const promise = new Promise((resolve) => (callback = resolve));
    Object.defineProperty(promise, "value", {
      set: setResult,
    });

    return promise;
  };

  const setResult = (data: any) => callback(data);

  Object.defineProperty(action, "$result", {
    get: getResult,
    set: setResult,
  });

  return action;
};
