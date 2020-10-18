import { useRef, useCallback } from 'react';

export default function useCallbackRef<T extends Element>(
  cb: (node: T | null) => any,
  deps: any[]
) {
  const elRef = useRef<T | null>(null);
  const cbRef = useCallback(
    (node: T | null) => {
      elRef.current = node;
      cb(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps]
  );
  return [elRef, cbRef] as const;
}
