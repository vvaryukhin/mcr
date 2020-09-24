import { AnyFunction } from 'types';
import { isNumber } from 'utils';

interface ISwipeOptions {
  onSwipeTop?: AnyFunction;
  onSwipeBottom?: AnyFunction;
  onSwipeLeft?: AnyFunction;
  onSwipeRight?: AnyFunction;
  onPanStart?: (panDetails: {
    event: TouchEvent | React.TouchEvent;
    startX: number;
    startY: number;
  }) => any;
  onPanMove?: (panDetails: {
    event: TouchEvent | React.TouchEvent;
    deltaX: number;
    deltaY: number;
  }) => any;
  onPanEnd?: (panDetails: {
    event: TouchEvent | React.TouchEvent;
    deltaX: number;
    deltaY: number;
  }) => any;
  threshold?: number;
}

export default function makeSwipeHandlers({
  onSwipeTop,
  onSwipeBottom,
  onSwipeLeft,
  onSwipeRight,
  onPanMove,
  onPanEnd,
  onPanStart,
  threshold = 30,
}: ISwipeOptions = {}) {
  let xStart: number | null = null;
  let yStart: number | null = null;
  let xDiff: number | null = null;
  let yDiff: number | null = null;

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } as const;

  function onTouchStart(e: TouchEvent | React.TouchEvent) {
    e.stopPropagation();
    xStart = e.touches[0].clientX;
    yStart = e.touches[0].clientY;
    xDiff = 0;
    yDiff = 0;
    onPanStart && onPanStart({ event: e, startX: xStart, startY: yStart });
  }

  function onTouchMove(e: TouchEvent | React.TouchEvent) {
    e.stopPropagation();
    if (!xStart || !yStart) {
      return;
    }
    const { clientX, clientY } = e.touches[0];
    xDiff = xStart - clientX;
    yDiff = yStart - clientY;
    onPanMove && onPanMove({ event: e, deltaX: xDiff, deltaY: yDiff });
  }

  function onTouchEnd(e: TouchEvent | React.TouchEvent) {
    if (!isNumber(xDiff) || !isNumber(yDiff)) return;
    onPanEnd && onPanEnd({ event: e, deltaX: xDiff, deltaY: yDiff });
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (Math.abs(xDiff) > threshold) {
        if (xDiff > 0) {
          /* left swipe */
          onSwipeLeft && onSwipeLeft();
        } else {
          /* right swipe */
          onSwipeRight && onSwipeRight();
        }
      }
    } else if (Math.abs(yDiff) > threshold) {
      if (yDiff > 0) {
        /* up swipe */
        onSwipeTop && onSwipeTop();
      } else {
        /* down swipe */
        onSwipeBottom && onSwipeBottom();
      }
    }

    /* reset values */
    xStart = null;
    yStart = null;
  }
}
