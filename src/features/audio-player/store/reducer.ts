import { AudioPlayerEvents } from './events';
import { IAudioPlayerActions } from './actions';
import { ICallRecord } from 'features/call-records/types';
import { exhaustiveCheck } from 'store/utils';

interface IPlayerState {
  playingRecord: ICallRecord | null;
  fullInfo: boolean;
  activeMessageId: number | null;
}

const initialState: IPlayerState = {
  playingRecord: null,
  fullInfo: false,
  activeMessageId: null,
};

export function reducer(
  state = initialState,
  action: IAudioPlayerActions
): IPlayerState {
  switch (action.type) {
    case AudioPlayerEvents.SET_PLAYING_RECORD:
      return { ...state, playingRecord: action.payload };
    case AudioPlayerEvents.SET_FULL_INFO:
      return { ...state, fullInfo: action.payload };
    case AudioPlayerEvents.SET_ACTIVE_MESSAGE:
      return { ...state, activeMessageId: action.payload };
    default:
      exhaustiveCheck(action);
      return state;
  }
}
