export const injectResultToAction = (action: any) => {
  let callback: Function;

  const $result = () => {
    const promise = new Promise(resolve => (callback = resolve));

    /**
     * provide an alternative way to set result when action is destructured:
     * const { $result } = withResult(...)(...)
     * $result.value = something
     */
    Object.defineProperty(promise, 'value', {
      set: setResult,
    });

    return promise;
  };

  // `callback` is actually `resolve` (from Promise) at the time setter is called
  const setResult = (data: any) => callback(data);

  Object.defineProperty(action, '$result', {
    get: $result,
    set: setResult,
  });

  return action;
};
