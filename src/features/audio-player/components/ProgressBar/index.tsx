import React, { useRef, useState, useEffect } from 'react';
import { toRange } from 'features/audio-player/utils';

interface IProgressBarProps {
  currentPercent: number;
  onUpdate: (percent: number) => void;
}

const ProgressBar = ({ currentPercent, onUpdate }: IProgressBarProps) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const isTouching = useRef(false);
  const progressBar = useRef<HTMLDivElement>(null);
  const progressBarRect = useRef<DOMRect>();

  useEffect(() => {
    if (!isTouching.current) {
      setProgressPercent(currentPercent);
    }
  }, [currentPercent, setProgressPercent]);

  const onProgressBarTouchMove = (e: React.TouchEvent) => {
    if (progressBar.current && progressBarRect.current) {
      const {
        left: progressBarLeft,
        width: progressBarWidth,
      } = progressBarRect.current;
      const clientX = e.touches[0].clientX;
      const clickOffset = clientX - progressBarLeft;
      const coefficient = clickOffset / progressBarWidth;
      const percent = toRange(coefficient * 100, [0, 100]);
      setProgressPercent(percent);
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

  return (
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
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
