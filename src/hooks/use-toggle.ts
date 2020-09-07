import { useReducer } from 'react';

export default function useToggle(initialValue: boolean = false) {
  return useReducer(v => !v, initialValue);
}
