import React, { useState, useEffect, useCallback } from 'react';
import { toInt } from 'utils';
import { useToggle } from 'hooks';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import ProgressBar from '../ProgressBar';
import { secondsToTime } from 'features/audio-player/utils';

interface IAudioPlayerProps {
  src: string | undefined;
}

const audio = new Audio();

const AudioPlayer = ({ src }: IAudioPlayerProps) => {
  const [playing, togglePlaying] = useToggle();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const pause = () => {
    if (!audio.paused) {
      audio.pause();
      togglePlaying();
    }
  };

  const play = () => {
    if (audio.paused) {
      audio.play();
      togglePlaying();
    }
  };

  const onTimeUpdate = useCallback(
    (e: Event) => {
      const currentTime = toInt((e.target as HTMLAudioElement).currentTime);
      const currentPercent = (currentTime / duration) * 100;
      setProgressPercent(currentPercent);
      setCurrentTime(currentTime);
    },
    [duration, setProgressPercent, setCurrentTime]
  );

  const onLoadMetaData = useCallback(() => {
    const intDuration = toInt(audio.duration);
    setDuration(intDuration);
  }, [setDuration]);

  useEffect(() => {
    src && (audio.src = src);
    audio.addEventListener('loadedmetadata', onLoadMetaData);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadMetaData);
    };
  }, [src, onLoadMetaData]);

  useEffect(() => {
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', togglePlaying);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', togglePlaying);
    };
  }, [onTimeUpdate, togglePlaying]);

  const updateCurrentTime = (percent: number) => {
    audio.currentTime = (percent / 100) * duration;
  };

  return (
    <div
      style={{
        display: src ? 'block' : 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#ccc',
        padding: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 0',
        }}
      >
        <div>{secondsToTime(currentTime)}</div>
        <ProgressBar currentPercent={progressPercent} onUpdate={updateCurrentTime} />
        <div>{secondsToTime(duration)}</div>
      </div>
      {playing ? (
        <button onClick={pause}>pause</button>
      ) : (
        <button onClick={play}>play</button>
      )}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { records } = state.callRecords;
  const { recordId: selectedRecordId } = state.audioPlayer;
  const selectedRecord = records.find(({ id }) => id === selectedRecordId);
  return {
    src: selectedRecord && selectedRecord.record.file,
  };
};

export default connect(mapStateToProps)(AudioPlayer);
