import React from 'react';
import ProgressBar from '../../ProgressBar';
import Select from 'components/Select';
import { PLAYBACK_SPEEDS_SELECT_OPTIONS } from '../playback-speeds';

import { ReactComponent as PlayIcon } from 'assets/images/play.svg';
import { ReactComponent as PauseIcon } from 'assets/images/pause.svg';
import { ReactComponent as RewindIcon } from 'assets/images/rewind.svg';
import { ReactComponent as FastForwardIcon } from 'assets/images/fast-forward.svg';

import './index.scss';
import { classNames } from 'utils';

interface IPlayerViewProps {
  isSmall?: boolean;
  playing: boolean;
  duration: string;
  currentTime: string;
  playbackSpeed: number;
  progressPercent: number;
  play: () => void;
  pause: () => void;
  goForward: () => void;
  goBackward: () => void;
  onPlaybackSpeedChange: React.ChangeEventHandler<HTMLSelectElement>;
  updateCurrentTime: (percent: number) => void;
}

const PlayerView = ({
  isSmall = false,
  playing,
  duration,
  currentTime,
  playbackSpeed,
  progressPercent,
  play,
  pause,
  goForward,
  goBackward,
  onPlaybackSpeedChange,
  updateCurrentTime,
}: IPlayerViewProps) => {
  return (
    <div className={`player ${classNames({ 'player--small': isSmall })}`}>
      <div className="player__time-progress">
        <div data-test-id="audio-player/current-time">{currentTime}</div>
        <ProgressBar currentPercent={progressPercent} onUpdate={updateCurrentTime} />
        <div>{duration}</div>
      </div>
      <div className="player__controls">
        {!isSmall && (
          <Select
            style={{ width: '25%' }}
            value={playbackSpeed}
            onChange={onPlaybackSpeedChange}
            options={PLAYBACK_SPEEDS_SELECT_OPTIONS}
            hasArrow={false}
            hasBorder={false}
            isLight
          />
        )}
        <div className="player__controls-time">
          <button
            className="player__update-time player__update-time--backward"
            onClick={goBackward}
            data-test-id="audio-player/backward"
          >
            <RewindIcon className="player__update-time-icon" />
          </button>
          {playing ? (
            <button
              className="player__toggle-playing-btn"
              onClick={pause}
              data-test-id="audio-player/pause"
            >
              <PauseIcon className="player__toggle-playing-icon player__toggle-playing-icon--pause" />
            </button>
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
    </div>
  );
};

export default PlayerView;
