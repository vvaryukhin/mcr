import { makeAction, IActionUnion } from 'store/utils';
import { AudioPlayerEvents } from './events';
import { ICallRecord } from 'features/call-records/types';

export const setPlayingRecord = makeAction<
  AudioPlayerEvents.SET_PLAYING_RECORD,
  ICallRecord
>(AudioPlayerEvents.SET_PLAYING_RECORD);

const actions = {
  setPlayingRecord,
};

export type IAudioPlayerActions = IActionUnion<typeof actions>;
