import { useRef } from 'react';

const GUARD = {};

export default function useLazyRef<T>(init: () => T) {
  const ref = useRef<T | typeof GUARD>(GUARD);
  if (!ref.current === GUARD) {
    ref.current = init();
  }
  return ref.current as T;
}
