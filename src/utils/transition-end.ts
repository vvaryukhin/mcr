import { AnyFunction } from 'types';

export default function transitionEnd(
  el: HTMLElement,
  cb: AnyFunction,
  { useBubble = false } = {}
) {
  const remove = () => el.removeEventListener('transitionend', onEnd);
  const onEnd = (e: TransitionEvent) => {
    if (!useBubble && e.target !== el) return;
    cb(e);
    remove();
  };
  el.addEventListener('transitionend', onEnd);
  return remove;
}
