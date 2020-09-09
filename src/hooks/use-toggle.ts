import { useReducer } from 'react';

export default function useToggle(initialValue = false) {
  return useReducer(v => !v, initialValue);
}
