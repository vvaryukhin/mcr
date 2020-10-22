import { makeAction, IActionUnion } from 'store/utils';
import { AudioPlayerEvents } from './events';
import { ICallRecord } from 'features/call-records/types';

export const setPlayingRecord = makeAction<
  AudioPlayerEvents.SET_PLAYING_RECORD,
  ICallRecord | null
>(AudioPlayerEvents.SET_PLAYING_RECORD);

export const setFullInfo = makeAction<AudioPlayerEvents.SET_FULL_INFO, boolean>(
  AudioPlayerEvents.SET_FULL_INFO
);

export const setActiveMessage = makeAction<
  AudioPlayerEvents.SET_ACTIVE_MESSAGE,
  number | null
>(AudioPlayerEvents.SET_ACTIVE_MESSAGE);

const actions = {
  setPlayingRecord,
  setFullInfo,
  setActiveMessage,
};

export type IAudioPlayerActions = IActionUnion<typeof actions>;
