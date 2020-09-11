import { IAnyFunction, IFunctionThisType } from 'types';
import { isNumber } from 'utils';

export default function debounce<T extends IAnyFunction>(ms: number, fn: T) {
  let timeoutId: number | null;
  return function debounced(this: IFunctionThisType<T>, ...args: Parameters<T>) {
    const ctx = this;
    if (isNumber(timeoutId)) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      fn.apply(ctx, args);
      timeoutId = null;
    }, ms);
  };
}
