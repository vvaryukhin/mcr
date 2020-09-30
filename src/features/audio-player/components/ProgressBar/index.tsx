import React, { useRef, useState, useEffect, useMemo } from 'react';
import { toRange } from 'features/audio-player/utils';
import { debounce } from 'utils';

interface IProgressBarProps {
  type?: ProgressBarType;
  currentPercent: number;
  onUpdate: (percent: number) => void;
  updateOnTouchmove?: boolean;
}

type ProgressBarType = 'horizontal' | 'vertical';

const calculateClickOffsetCoefficient = (
  rect: DOMRect,
  touch: React.Touch,
  type: ProgressBarType
) => {
  let progressCoefficient;
  if (type === 'vertical') {
    const { bottom, height } = rect;
    const clientY = touch.clientY;
    const touchOffsetFromStart = bottom - clientY;
    progressCoefficient = touchOffsetFromStart / height;
  } else {
    const { left, width } = rect;
    const clientX = touch.clientX;
    const touchOffsetFromStart = clientX - left;
    progressCoefficient = touchOffsetFromStart / width;
  }
  return progressCoefficient;
};

const ProgressBar = ({
  type = 'horizontal',
  currentPercent,
  onUpdate,
  updateOnTouchmove = false,
}: IProgressBarProps) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const isTouching = useRef(false);
  const progressBar = useRef<HTMLDivElement>(null);
  const progressBarRect = useRef<DOMRect>();

  useEffect(() => {
    if (!isTouching.current) {
      setProgressPercent(currentPercent);
    }
  }, [currentPercent, setProgressPercent]);

  const debouncedOnUpdate = useMemo(() => debounce(50, onUpdate), [onUpdate]);

  const onProgressBarTouchMove = (e: React.TouchEvent) => {
    if (progressBar.current && progressBarRect.current) {
      const progressCoefficient = calculateClickOffsetCoefficient(
        progressBarRect.current,
        e.touches[0],
        type
      );
      const percent = toRange(progressCoefficient * 100, [0, 100]);
      setProgressPercent(percent);
      updateOnTouchmove && debouncedOnUpdate(percent);
    }
  };

  const onProgressBarTouchStart = (e: React.TouchEvent) => {
    isTouching.current = true;
    if (progressBar.current) {
      progressBarRect.current = progressBar.current.getBoundingClientRect();
      onProgressBarTouchMove(e);
    }
  };

  const onProgressBarTouchEnd = () => {
    isTouching.current = false;
    onUpdate(progressPercent);
  };

  return type === 'horizontal' ? (
    <div
      ref={progressBar}
      onTouchStart={onProgressBarTouchStart}
      onTouchMove={onProgressBarTouchMove}
      onTouchEnd={onProgressBarTouchEnd}
      style={{
        display: 'flex',
        alignItems: 'center',
        flex: '1',
        margin: '0 10px',
      }}
      data-test-id="progress-bar"
    >
      <div
        style={{
          height: '2px',
          background: 'gray',
          flex: '1',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${progressPercent}%`,
            width: 8,
            height: 8,
            background: '#f50',
            borderRadius: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
          }}
        ></div>
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: '#f50',
          }}
          data-test-id="progress-bar/progress-line"
        ></div>
      </div>
    </div>
  ) : (
    <div
      ref={progressBar}
      onTouchStart={onProgressBarTouchStart}
      onTouchMove={onProgressBarTouchMove}
      onTouchEnd={onProgressBarTouchEnd}
      style={{
        width: '22px',
        margin: '0px 10px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        padding: '5px',
        background: 'aqua',
        bottom: '50%',
        left: '100%',
      }}
      data-test-id="progress-bar"
    >
      <div
        style={{
          width: '2px',
          height: '200px',
          background: 'gray',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: `${progressPercent}%`,
            left: '50%',
            width: 8,
            height: 8,
            background: '#f50',
            borderRadius: '50%',
            transform: 'translateY(50%) translateX(-50%)',
          }}
        ></div>
        <div
          style={{
            width: '100%',
            height: `${progressPercent}%`,
            position: 'absolute',
            bottom: '0',
            background: '#f50',
          }}
          data-test-id="progress-bar/progress-line"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
