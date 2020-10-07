import { useRef, useCallback } from 'react';

export default function useCallbackRef<T extends Element>(
  cb: (node: T | null) => any,
  deps: any[] = []
) {
  const elRef = useRef<T | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedCb = useCallback(cb, [...deps]);
  const cbRef = useCallback(
    (node: T | null) => {
      elRef.current = node;
      memoizedCb(node);
    },
    [memoizedCb]
  );
  return [elRef, cbRef] as const;
}
