import memoizee from 'memoizee';

export const memoize = (fn, opts = {}) => memoizee(fn, { max: 100, ...opts });

export const memoizePromise = (fn, opts = {}) =>
  memoize(fn, { promise: true, ...opts });
