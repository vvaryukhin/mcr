import {
  ICallRecord,
  IDateInterval,
  CallRecordsSortingTypes,
  CallDirectionTypes,
} from 'features/call-records/types';
import { ICallRecordAction } from './actions';
import { CallRecordsEvents } from './events';

interface ICallRecordsState {
  records: ICallRecord[];
  searchQuery: string;
  sorting: CallRecordsSortingTypes;
  dateInterval: IDateInterval;
  direction: CallDirectionTypes;
  isLoading: boolean;
  isFailed: boolean;
}

const initialState: ICallRecordsState = {
  records: [],
  searchQuery: '',
  sorting: CallRecordsSortingTypes.DATE_ACS,
  dateInterval: {},
  direction: CallDirectionTypes.ALL,
  isLoading: false,
  isFailed: false,
};

export function reducer(
  state: ICallRecordsState = initialState,
  action: ICallRecordAction
): ICallRecordsState {
  switch (action.type) {
    case CallRecordsEvents.REQUEST_RECORDS:
      return { ...state, isLoading: true };
    case CallRecordsEvents.REQUEST_RECORDS_SUCCESS:
      return {
        ...state,
        records: action.payload,
        isLoading: false,
        isFailed: false,
      };
    case CallRecordsEvents.REQUEST_RECORDS_FAILED:
      return { ...state, isFailed: true, isLoading: false };
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
    case CallRecordsEvents.SET_CALL_DIRECTION:
      return { ...state, direction: action.payload };
    default:
      return state;
  }
}
