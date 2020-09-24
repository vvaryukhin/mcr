import isObject from './is-object';
import isString from './is-string';

export default function style(
  el: HTMLElement,
  styleMap: Record<string, string>
): void;
export default function style(el: HTMLElement, key: string, value: string): void;
export default function style(
  el: HTMLElement,
  keyOrStyleMap: string | Record<string, string>,
  value?: string
) {
  // prettier-ignore
  const styleMap =
    isString(value) && isString(keyOrStyleMap)
      ? { [keyOrStyleMap]: value }
      : isObject(keyOrStyleMap)
        ? keyOrStyleMap
        : {};
  Object.entries(styleMap).forEach(([k, v]) => {
    el.style[k as any] = v;
  });
}
