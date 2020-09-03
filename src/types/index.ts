export type IAnyFunction = (...args: any[]) => any;

export type IAnyObject = Record<string, any>;

export type IFunctionThisType<T extends IAnyFunction> = T extends (
  this: infer U,
  ...args: any[]
) => any
  ? U
  : unknown;
