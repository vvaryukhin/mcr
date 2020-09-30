import isFunction from './is-function';

const isNaN = isFunction(Number.isNaN)
  ? Number.isNaN
  : (number: unknown): boolean => {
      // eslint-disable-next-line no-self-compare
      return number !== number;
    };

export default isNaN;
