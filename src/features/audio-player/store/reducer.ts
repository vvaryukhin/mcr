import { AudioPlayerEvents } from './events';
import { IAudioPlayerActions } from './actions';
import { ICallRecord } from 'features/call-records/types';

interface IPlayerState {
  playingRecord: ICallRecord | null;
}

const initialState: IPlayerState = {
  playingRecord: null,
};

export function reducer(
  state = initialState,
  action: IAudioPlayerActions
): IPlayerState {
  switch (action.type) {
    case AudioPlayerEvents.SET_PLAYING_RECORD:
      return { ...state, playingRecord: action.payload };
    default:
      return state;
  }
}
