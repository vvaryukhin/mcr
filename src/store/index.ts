import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { callRecordsReducer } from 'features/call-records/store';
import { audioPlayerReducer } from 'features/audio-player/store';
import { __DEV__ } from 'env';

const rootReducer = combineReducers({
  callRecords: callRecordsReducer,
  audioPlayer: audioPlayerReducer,
});

const composeEnhancers =
  (__DEV__ &&
    ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose)) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type IAppState = ReturnType<typeof rootReducer>;
