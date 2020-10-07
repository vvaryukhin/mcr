import { off } from 'utils';

export default function on(
  element: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject
) {
  element.addEventListener(type, listener);
  return () => off(element, type, listener);
}
