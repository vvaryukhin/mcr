import { AnyFunction, FunctionThisType } from 'types';
import { isNumber } from 'utils';

interface DebounceFunction<T extends AnyFunction> {
  (this: FunctionThisType<T>, ...args: Parameters<T>): void;
  cancel: () => void;
}

export default function debounce<T extends AnyFunction>(ms: number, fn: T) {
  let timeoutId: number | null;
  const cancel = () => isNumber(timeoutId) && clearTimeout(timeoutId);
  const debounced: DebounceFunction<T> = function debounced(...args) {
    cancel();
    timeoutId = window.setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, ms);
  };
  debounced.cancel = cancel;
  return debounced;
}
