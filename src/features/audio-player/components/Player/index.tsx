import React, { useState, useRef, useCallback, useEffect } from 'react';
import PlayerView from './component2';
import { ICallRecord } from 'features/call-records/types';
import { toInt, secondsToHHMMSS } from 'utils';

interface IPlayerProps {
  playingRecord: ICallRecord;
}

const Player = ({ playingRecord }: IPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

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

  return (
    <PlayerView
      playing={playing}
      audioRef={audioRef}
      progressPercent={progressPercent}
      onLoadedMetaData={onLoadedMetaData}
      onTimeUpdate={onTimeUpdate}
      onEnded={() => setPlaying(false)}
      currentTime={secondsToHHMMSS(currentTime)}
      duration={secondsToHHMMSS(duration)}
      playbackSpeed={playbackSpeed}
      onPlaybackSpeedChange={onPlaybackSpeedChange}
      play={play}
      pause={pause}
      goForward={goForward}
      goBackward={goBackward}
      updateCurrentTime={updateCurrentTime}
    />
  );
};

export default Player;
