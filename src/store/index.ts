import { createStore, combineReducers } from 'redux';
import { callRecordsReducer } from 'features/call-records/store';

const rootReducer = combineReducers({
  callRecords: callRecordsReducer,
});

export const store = createStore(rootReducer);

export type IAppState = ReturnType<typeof rootReducer>;
