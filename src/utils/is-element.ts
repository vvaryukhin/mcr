export default function isElement(val: unknown): val is Element {
  return val instanceof Element;
}
