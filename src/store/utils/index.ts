import { IAnyFunction } from 'types';

export const makeAction = <T extends string, P>(type: T) => (payload: P) => {
  return {
    type,
    payload,
  };
};

export type IActionUnion<A extends Record<string, IAnyFunction>> = ReturnType<
  A[keyof A]
>;
