export type AnyFunction = (...args: any[]) => any;

export type AnyObject = Record<string, any>;

export type FunctionThisType<T extends AnyFunction> = T extends (
  this: infer U,
  ...args: any[]
) => any
  ? U
  : unknown;
