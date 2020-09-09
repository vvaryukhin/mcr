import { IAnyFunction } from 'types';

export function makeAction<T extends string>(type: T): () => { type: T };
export function makeAction<T extends string, P>(
  type: T
): (payload: P) => { type: T; payload: P };
export function makeAction<T extends string, P>(type: T) {
  return function (payload?: P) {
    return {
      type,
      payload,
    };
  };
}

export type IActionUnion<A extends Record<string, IAnyFunction>> = ReturnType<
  A[keyof A]
>;
