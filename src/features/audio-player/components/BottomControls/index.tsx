import React, { useState, useCallback, useRef, useEffect } from 'react';
import { toInt } from 'utils';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import ProgressBar from '../ProgressBar';
import { secondsToHHMMSS } from 'utils';
import { ICallRecord } from 'features/call-records/types';

import './index.scss';

interface IAudioPlayerProps {
  playingRecord: ICallRecord | null;
}

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export const AudioPlayer = ({ playingRecord }: IAudioPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const onVolumeChange = (percent: number) => {
    console.log('here');
    const { current: audio } = audioRef;
    if (audio) {
      const volume = percent / 100;
      audio.volume = volume;
      setVolume(volume);
    }
  };

  return (
    <div
      className="player"
      data-test-id="audio-player"
      style={{
        display: playingRecord ? 'block' : 'none',
      }}
    >
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetaData}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setPlaying(false)}
        style={{ display: 'none' }}
        data-test-id="audio-player/audio"
      ></audio>
      <div className="player__audio-controls">
        <select value={playbackSpeed} onChange={onPlaybackSpeedChange}>
          {PLAYBACK_SPEEDS.map(v => (
            <option value={v} key={`playback-speed-${v}`}>
              {v}
            </option>
          ))}
        </select>
        <div className="player__volume-updater">
          change volume
          <ProgressBar
            type="vertical"
            currentPercent={volume * 100}
            onUpdate={onVolumeChange}
            updateOnTouchmove
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 0',
        }}
      >
        <div data-test-id="audio-player/current-time">
          {secondsToHHMMSS(currentTime)}
        </div>
        <ProgressBar currentPercent={progressPercent} onUpdate={updateCurrentTime} />
        <div>{secondsToHHMMSS(duration)}</div>
      </div>
      <div className="player__time-controls">
        <button onClick={goBackward} data-test-id="audio-player/backward">
          backward
        </button>
        {playing ? (
          <>
            <button onClick={pause} data-test-id="audio-player/pause">
              pause
            </button>
          </>
        ) : (
          <button onClick={play} data-test-id="audio-player/play">
            play
          </button>
        )}
        <button onClick={goForward} data-test-id="audio-player/forward">
          forward
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    playingRecord: state.audioPlayer.playingRecord,
  };
};

export default connect(mapStateToProps)(AudioPlayer);
