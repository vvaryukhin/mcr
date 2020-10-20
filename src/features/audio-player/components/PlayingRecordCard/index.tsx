import React, { useState, useRef, useEffect, useMemo } from 'react';
import Player from '../Player';
import Transcription from '../Transcriptions';
import RecordInfo from 'features/call-records/components/RecordInfo';
import { isNumber, nextFrame, style, transitionEnd } from 'utils';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { ICallRecord } from 'features/call-records/types';
import { setFullInfo, setPlayingRecord } from 'features/audio-player/store';
import { useCallbackRef } from 'hooks';
import makeSwipeHandlers from 'utils/swipe';

import { ReactComponent as MenuIcon } from 'assets/images/menu.svg';
import { ReactComponent as MinusIcon } from 'assets/images/minus.svg';

import styles from './index.scss';

interface IAudioPlayerProps {
  playingRecord: ICallRecord | null;
  setOpenedMenu: (record: ICallRecord | undefined) => void;
  fullInfo: boolean;
  setFullInfo: (value: boolean) => void;
  activeMessageId: number | null;
  setPlayingRecord: (value: ICallRecord | null) => void;
}

const EXPAND_PLAYER_THRESHOLD = 60;

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

const AudioPlayer = ({
  playingRecord,
  setOpenedMenu,
  fullInfo,
  setFullInfo,
  activeMessageId,
  setPlayingRecord,
}: IAudioPlayerProps) => {
  const [showTranscriptions, setShowTranscriptions] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef({ initial: 0, max: 0 });

  const [rootEl, rootRef] = useCallbackRef<HTMLDivElement>(
    el => {
      if (el) {
        el.style.height = '';
        const initial = el.getBoundingClientRect().height;
        el.style.height = styles.PLAYER_MAX_HEIGHT;
        const max = el.getBoundingClientRect().height;
        el.style.height = '';
        heightRef.current = { initial, max };
      }
    },
    [playingRecord]
  );

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
  }, [fullInfo, setFullInfo, rootEl]);

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
      transitionPlayer(el, isOpening, duration);
      transitionEnd(el, () => {
        setShowTranscriptions(isOpening);
      });
      if (overlayRef.current) {
        transitionOverlay(overlayRef.current, isOpening, duration);
      }
    }
  }, [fullInfo, rootEl]);

  useEffect(() => {
    if (showTranscriptions) {
      rootEl.current
        ?.querySelector(`[data-message-id="${activeMessageId}"]`)
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [rootEl, activeMessageId, showTranscriptions]);

  return playingRecord ? (
    <div className="player" style={{ height: heightRef.current.initial }}>
      <div
        className="player__overlay"
        ref={overlayRef}
        onClick={() => setFullInfo(false)}
      ></div>
      <div ref={rootRef} className="player__content" data-test-id="audio-player">
        <div {...handlers} className="player__drag">
          <MinusIcon className="player__drag-icon" />
        </div>
        <div
          onClick={() => setPlayingRecord(null)}
          style={{ position: 'absolute', padding: 23, top: 0, right: 0 }}
        >
          close
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <RecordInfo record={playingRecord} theme="light" />
          <button onClick={() => setOpenedMenu(playingRecord)}>
            <MenuIcon fill="white" width="16" height="16" />
          </button>
        </div>

        <Player playingRecord={playingRecord} />

        {showTranscriptions && (
          <Transcription transcriptions={playingRecord.record.transcriptions} />
        )}
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state: IAppState) => {
  return {
    playingRecord: state.audioPlayer.playingRecord,
    fullInfo: state.audioPlayer.fullInfo,
    activeMessageId: state.audioPlayer.activeMessageId,
  };
};

const mapDispatchToProps = {
  setFullInfo,
  setPlayingRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
