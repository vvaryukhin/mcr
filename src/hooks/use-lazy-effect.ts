import { useEffect, useRef } from 'react';

const useLazyEffect: typeof useEffect = (cb, deps) => {
  const isMounted = useRef(false);

  useEffect((...args) => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return cb(...args);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useLazyEffect;
