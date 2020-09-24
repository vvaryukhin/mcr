import { AnyObject } from 'types';

export default function hasOwn<T extends AnyObject>(
  obj: T,
  key: PropertyKey
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
