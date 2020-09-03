import {
  ICallRecord,
  IDateInterval,
  CallRecordsSortingTypes,
} from 'features/call-records/types';
import { ICallRecordAction } from './actions';
import { CallRecordsEvents } from './events';

interface ICallRecordsState {
  records: ICallRecord[];
  searchQuery: string;
  sorting: CallRecordsSortingTypes;
  dateInterval: IDateInterval;
}

const initialState: ICallRecordsState = {
  records: [],
  searchQuery: '',
  sorting: CallRecordsSortingTypes.DATE_ACS,
  dateInterval: {},
};

export function reducer(
  state: ICallRecordsState = initialState,
  action: ICallRecordAction
) {
  switch (action.type) {
    case CallRecordsEvents.SET_RECORDS:
      return { ...state, records: action.payload };
    case CallRecordsEvents.DELETE_RECORD:
      return {
        ...state,
        records: state.records.filter(({ id }) => id !== action.payload),
      };
    case CallRecordsEvents.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case CallRecordsEvents.SET_SORTING:
      return { ...state, sorting: action.payload };
    case CallRecordsEvents.SET_DATE_INTERVAL:
      return { ...state, dateInterval: action.payload };
    default:
      return state;
  }
}
