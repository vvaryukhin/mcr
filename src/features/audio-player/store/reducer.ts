import { AudioPlayerEvents } from './events';
import { IAudioPlayerActions } from './actions';

interface IPlayerState {
  recordId: number;
}

const initialState: IPlayerState = {
  recordId: -1,
};

export function reducer(
  state = initialState,
  action: IAudioPlayerActions
): IPlayerState {
  switch (action.type) {
    case AudioPlayerEvents.SET_PLAYING_RECORD_ID:
      return { ...state, recordId: action.payload };
    default:
      return state;
  }
}
