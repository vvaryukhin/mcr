import { ICallRecord } from 'features/call-records/types';
import { ICallRecordAction } from './actions';
import { CallRecordEvents } from './events';

interface ICallRecordsState {
  records: ICallRecord[];
}

const initialState: ICallRecordsState = {
  records: [],
};

export function reducer(
  state: ICallRecordsState = initialState,
  action: ICallRecordAction
) {
  switch (action.type) {
    case CallRecordEvents.SET_RECORDS:
      return { ...state, records: action.payload };
    default:
      return state;
  }
}
