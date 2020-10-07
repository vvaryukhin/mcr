export default function isObject(val: unknown): val is Record<PropertyKey, any> {
  return typeof val === 'object' && val !== null;
}
