import { ICallRecord, CallRecordsSortingTypes } from 'features/call-records/types';
import { ICallRecordAction } from './actions';
import { CallRecordsEvents } from './events';

interface ICallRecordsState {
  records: ICallRecord[];
  searchQuery: string;
  sorting: CallRecordsSortingTypes;
}

const initialState: ICallRecordsState = {
  records: [],
  searchQuery: '',
  sorting: CallRecordsSortingTypes.DATE_ACS,
};

export function reducer(
  state: ICallRecordsState = initialState,
  action: ICallRecordAction
) {
  switch (action.type) {
    case CallRecordsEvents.SET_RECORDS:
      return { ...state, records: action.payload };
    case CallRecordsEvents.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case CallRecordsEvents.SET_SORTING:
      return { ...state, sorting: action.payload };
    default:
      return state;
  }
}
