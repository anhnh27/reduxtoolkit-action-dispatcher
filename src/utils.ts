export const injectResultToAction = (action: any) => {
  let callback: Function;

  const $result = () => {
    const promise = new Promise(resolve => (callback = resolve));
    Object.defineProperty(promise, 'value', {
      set: setResult,
    });

    return promise;
  };

  const setResult = (data: any) => callback(data);

  Object.defineProperty(action, '$result', {
    get: $result,
    set: setResult,
  });

  return action;
};
