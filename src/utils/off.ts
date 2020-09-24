export default function off(
  element: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject
) {
  element.removeEventListener(type, listener);
}
