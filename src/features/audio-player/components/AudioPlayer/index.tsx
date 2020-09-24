import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import Select from 'components/Select';
import ProgressBar from '../ProgressBar';
import Transcription from '../Transcriptions';
import ShortRecordInfo from 'features/call-records/components/ShortRecordInfo';
import {
  blockScroll,
  isNumber,
  nextFrame,
  style,
  toInt,
  transitionEnd,
  unlockScroll,
} from 'utils';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { secondsToHHMMSS } from 'utils';
import { ICallRecord } from 'features/call-records/types';
import { useCallbackRef } from 'hooks';
import makeSwipeHandlers from 'utils/swipe';

import { ReactComponent as PlayIcon } from 'assets/images/play.svg';
import { ReactComponent as MinusIcon } from 'assets/images/minus.svg';
import { ReactComponent as PauseIcon } from 'assets/images/pause.svg';
import { ReactComponent as RewindIcon } from 'assets/images/rewind.svg';
import { ReactComponent as FastForwardIcon } from 'assets/images/fast-forward.svg';

import styles from './index.scss';

interface IAudioPlayerProps {
  playingRecord: ICallRecord | null;
}

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const PLAYBACK_SPEEDS_SELECT_OPTIONS = PLAYBACK_SPEEDS.map(v => ({
  title: v + 'x',
  value: v,
}));

const EXPAND_PLAYER_THRESHOLD = 80;

function performTransition(
  el: HTMLElement,
  options: {
    start: Record<string, string>;
    nextFrame: Record<string, string>;
    end: Record<string, string>;
  }
) {
  style(el, options.start);
  nextFrame(() => {
    style(el, options.nextFrame);
  });
  transitionEnd(el, () => {
    style(el, options.end);
  });
}

function calculateDuration(
  currentHeight: number,
  minHeight: number,
  maxHeight: number,
  baseDuration: number,
  isOpening: boolean
) {
  let openingRatio = (maxHeight - currentHeight) / (maxHeight - minHeight);
  if (!isOpening) {
    openingRatio = 1 - openingRatio;
  }
  return openingRatio * baseDuration;
}

export const AudioPlayer = ({ playingRecord }: IAudioPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [fullInfo, setFullInfo] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const heightRef = useRef({ initial: 0, max: 0 });

  const [rootEl, rootRef] = useCallbackRef<HTMLDivElement>(el => {
    if (el) {
      const initial = el.getBoundingClientRect().height;
      el.style.height = styles.PLAYER_MAX_HEIGHT;
      const max = el.getBoundingClientRect().height;
      el.style.height = '';
      heightRef.current = { initial, max };
    }
  });

  const handlers = useMemo(() => {
    return makeSwipeHandlers({
      onPanMove({ deltaY }) {
        const el = rootEl.current;
        if (el) {
          const { initial: initialHeight, max: maxHeight } = heightRef.current;
          let openedPercent: number | null = null;
          let newHeight: number | null = null;
          if (!fullInfo && deltaY > 0) {
            newHeight = initialHeight + deltaY;
            if (newHeight > maxHeight) {
              newHeight = maxHeight;
            }
          } else if (fullInfo && deltaY < 0) {
            newHeight = maxHeight + deltaY;
            if (newHeight < initialHeight) {
              newHeight = initialHeight;
            }
          }
          if (isNumber(newHeight)) {
            style(el, 'height', `${newHeight}px`);
            openedPercent =
              (newHeight - initialHeight) / (maxHeight - initialHeight);
          }
          if (overlayRef.current && isNumber(openedPercent)) {
            style(overlayRef.current, 'opacity', `${openedPercent}`);
          }
        }
      },
      onPanEnd({ deltaY }) {
        const el = rootEl.current;
        const absoluteDeltaY = Math.abs(deltaY);
        if (absoluteDeltaY > EXPAND_PLAYER_THRESHOLD) {
          setFullInfo(deltaY > 0);
        } else if (el) {
          if (fullInfo) {
            style(el, 'height', `${heightRef.current.max}px`);
          } else {
            style(el, 'height', '');
            overlayRef.current && style(overlayRef.current, 'opacity', '0');
          }
        }
      },
    });
  }, [fullInfo, rootEl]);

  useEffect(() => {
    const { initial: initialHeight, max: maxHeight } = heightRef.current;

    function transitionPlayer(el: HTMLElement, opening: boolean, duration: number) {
      const [startingHeight, finalHeight] = opening
        ? [initialHeight, maxHeight]
        : [maxHeight, initialHeight];

      if (!el.style.height) {
        style(el, 'height', `${startingHeight}px`);
      }
      return performTransition(el, {
        start: { transition: `height ${duration}ms ease-in-out` },
        nextFrame: { height: `${finalHeight}px` },
        end: { transition: '' },
      });
    }

    function transitionOverlay(el: HTMLElement, opening: boolean, duration: number) {
      const [opacity, pointerEvents] = opening ? ['1', 'auto'] : ['0', ''];
      performTransition(el, {
        start: { transition: `opacity ${duration}ms ease-in-out`, pointerEvents },
        nextFrame: { opacity },
        end: { transition: '' },
      });
    }

    if (rootEl.current) {
      const el = rootEl.current;
      const currentHeight = el.offsetHeight;
      const isOpening = fullInfo;
      const duration = calculateDuration(
        currentHeight,
        initialHeight,
        maxHeight,
        /* baseDuration */ 300,
        isOpening
      );
      fullInfo ? blockScroll() : unlockScroll();
      transitionPlayer(el, isOpening, duration);
      if (overlayRef.current) {
        transitionOverlay(overlayRef.current, isOpening, duration);
      }
    }
  }, [fullInfo, rootEl]);

  const pause = useCallback(() => {
    const { current: audio } = audioRef;
    if (audio && !audio.paused) {
      audio.pause();
      setPlaying(false);
    }
  }, [setPlaying]);

  const play = () => {
    const { current: audio } = audioRef;
    if (audio && audio.paused) {
      audio.play();
      setPlaying(true);
    }
  };

  const goForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const goBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const currentTime = toInt((e.target as HTMLAudioElement).currentTime);
    const currentPercent = (currentTime / duration) * 100;
    setProgressPercent(currentPercent);
    setCurrentTime(currentTime);
  };

  const onLoadedMetaData = () => {
    const intDuration = toInt(audioRef.current?.duration);
    setDuration(intDuration);
  };

  useEffect(() => {
    const { current: audio } = audioRef;
    if (playingRecord && audio) {
      audio.src = playingRecord.record.file;
    }
    return pause;
  }, [pause, playingRecord]);

  const updateCurrentTime = (percent: number) => {
    const { current: audio } = audioRef;
    if (audio) {
      audio.currentTime = (percent / 100) * duration;
    }
  };

  const onPlaybackSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speed = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
    setPlaybackSpeed(speed);
  };

  return playingRecord ? (
    <>
      <div
        className="player-overlay"
        ref={overlayRef}
        onClick={() => setFullInfo(false)}
      ></div>
      <div ref={rootRef} className="player" data-test-id="audio-player">
        <div {...handlers} className="player__drag">
          <MinusIcon className="player__drag-icon" />
        </div>
        <ShortRecordInfo record={playingRecord} theme="light" />
        <audio
          ref={audioRef}
          onLoadedMetadata={onLoadedMetaData}
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setPlaying(false)}
          style={{ display: 'none' }}
          data-test-id="audio-player/audio"
        ></audio>
        <div className="player__time-progress">
          <div data-test-id="audio-player/current-time">
            {secondsToHHMMSS(currentTime)}
          </div>
          <ProgressBar
            currentPercent={progressPercent}
            onUpdate={updateCurrentTime}
          />
          <div>{secondsToHHMMSS(duration)}</div>
        </div>
        <div className="player__controls">
          <Select
            style={{ width: '25%' }}
            value={playbackSpeed}
            onChange={onPlaybackSpeedChange}
            options={PLAYBACK_SPEEDS_SELECT_OPTIONS}
            hasArrow={false}
            hasBorder={false}
            isLight
          />
          <div className="player__controls-time">
            <button
              className="player__update-time player__update-time--backward"
              onClick={goBackward}
              data-test-id="audio-player/backward"
            >
              <RewindIcon className="player__update-time-icon" />
            </button>
            {playing ? (
              <>
                <button
                  className="player__toggle-playing-btn"
                  onClick={pause}
                  data-test-id="audio-player/pause"
                >
                  <PauseIcon className="player__toggle-playing-icon player__toggle-playing-icon--pause" />
                </button>
              </>
            ) : (
              <button
                className="player__toggle-playing-btn"
                onClick={play}
                data-test-id="audio-player/play"
              >
                <PlayIcon className="player__toggle-playing-icon player__toggle-playing-icon--play" />
              </button>
            )}
            <button
              className="player__update-time player__update-time--forward"
              onClick={goForward}
              data-test-id="audio-player/forward"
            >
              <FastForwardIcon className="player__update-time-icon" />
            </button>
          </div>
        </div>

        {fullInfo && (
          <Transcription transcriptions={playingRecord.record.transcriptions} />
        )}
      </div>
    </>
  ) : null;
};

const mapStateToProps = (state: IAppState) => {
  return {
    playingRecord: state.audioPlayer.playingRecord,
  };
};

export default connect(mapStateToProps)(AudioPlayer);
