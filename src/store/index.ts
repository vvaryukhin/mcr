import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { callRecordsReducer } from 'features/call-records/store';
import { audioPlayerReducer } from 'features/audio-player/store';

const rootReducer = combineReducers({
  callRecords: callRecordsReducer,
  audioPlayer: audioPlayerReducer,
});

const composeEnhancers =
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type IAppState = ReturnType<typeof rootReducer>;
