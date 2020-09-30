export default function isObject(val: unknown): val is Record<PropertyKey, string> {
  return typeof val === 'object' && val !== null;
}
