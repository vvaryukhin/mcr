import { makeAction, IActionUnion } from 'store/utils';
import { AudioPlayerEvents } from './events';

export const setPlayingRecord = makeAction<
  AudioPlayerEvents.SET_PLAYING_RECORD_ID,
  number
>(AudioPlayerEvents.SET_PLAYING_RECORD_ID);

const actions = {
  setPlayingRecord,
};

export type IAudioPlayerActions = IActionUnion<typeof actions>;
