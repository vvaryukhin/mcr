import React, { useState, useCallback, useRef, useEffect } from 'react';
import { toInt } from 'utils';
import { useToggle } from 'hooks';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import ProgressBar from '../ProgressBar';
import { secondsToHHMMSS } from 'utils';
import { ICallRecord } from 'features/call-records/types';

interface IAudioPlayerProps {
  playingRecord: ICallRecord | null;
}

export const AudioPlayer = ({ playingRecord }: IAudioPlayerProps) => {
  const [playing, togglePlaying] = useToggle();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const pause = useCallback(() => {
    const { current: audio } = audioRef;
    if (audio && !audio.paused) {
      audio.pause();
      togglePlaying();
    }
  }, [togglePlaying]);

  const play = () => {
    const { current: audio } = audioRef;
    if (audio && audio.paused) {
      audio.play();
      togglePlaying();
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

  return (
    <div
      data-test-id="audio-player"
      style={{
        display: playingRecord ? 'block' : 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#ccc',
        padding: 10,
      }}
    >
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetaData}
        onTimeUpdate={onTimeUpdate}
        onEnded={togglePlaying}
        style={{ display: 'none' }}
      ></audio>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 0',
        }}
      >
        <div>{secondsToHHMMSS(currentTime)}</div>
        <ProgressBar currentPercent={progressPercent} onUpdate={updateCurrentTime} />
        <div>{secondsToHHMMSS(duration)}</div>
      </div>
      {playing ? (
        <button onClick={pause} data-test-id="audio-player/pause">
          pause
        </button>
      ) : (
        <button onClick={play} data-test-id="audio-player/play">
          play
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    playingRecord: state.audioPlayer.playingRecord,
  };
};

export default connect(mapStateToProps)(AudioPlayer);
