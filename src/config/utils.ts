export function callAll(...fns: Array<Function | undefined>) {
  return (...args: unknown[]) => {
    fns.forEach((fn) => {
      fn && fn(...args);
    });
  };
}
