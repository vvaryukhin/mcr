import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { callRecordsReducer } from 'features/call-records/store';
import { audioPlayerReducer } from 'features/audio-player/store';

const rootReducer = combineReducers({
  callRecords: callRecordsReducer,
  audioPlayer: audioPlayerReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type IAppState = ReturnType<typeof rootReducer>;
