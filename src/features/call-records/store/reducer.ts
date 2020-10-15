import {
  ICallRecord,
  IDateInterval,
  CallRecordsSortingTypes,
  CallDirectionFilters,
} from 'features/call-records/types';
import { exhaustiveCheck } from 'store/utils';
import { ICallRecordAction } from './actions';
import { CallRecordsEvents } from './events';

interface ICallRecordsState {
  records: ICallRecord[];
  searchQuery: string;
  sorting: CallRecordsSortingTypes;
  dateInterval: IDateInterval;
  direction: CallDirectionFilters;
  page: number;
  hasMoreRecords: boolean;
  isFetching: boolean;
  isFetchingFailed: boolean;
  isLoadingMore: boolean;
  isLoadingMoreFailed: boolean;
}

const initialState: ICallRecordsState = {
  records: [],
  searchQuery: '',
  sorting: CallRecordsSortingTypes.DATE_ACS,
  dateInterval: {},
  direction: CallDirectionFilters.ALL,
  page: 1,
  hasMoreRecords: false,
  isFetching: false,
  isFetchingFailed: false,
  isLoadingMore: false,
  isLoadingMoreFailed: false,
};

export function reducer(
  state: ICallRecordsState = initialState,
  action: ICallRecordAction
): ICallRecordsState {
  switch (action.type) {
    case CallRecordsEvents.REQUEST_RECORDS:
      return { ...state, isFetching: true, page: 1 };
    case CallRecordsEvents.REQUEST_RECORDS_SUCCESS:
      return {
        ...state,
        records: action.payload.records,
        isFetching: false,
        isFetchingFailed: false,
        hasMoreRecords: action.payload.hasMoreRecords,
      };
    case CallRecordsEvents.REQUEST_RECORDS_FAIL:
      return { ...state, isFetchingFailed: true, isFetching: false };
    case CallRecordsEvents.DELETE_RECORD_REQUEST:
      return {
        ...state,
        records: state.records.map(val =>
          val.id === action.payload ? { ...val, isDeleting: true } : val
        ),
      };
    case CallRecordsEvents.DELETE_RECORD_SUCCESS:
      return {
        ...state,
        records: state.records.filter(({ id }) => id !== action.payload),
      };
    case CallRecordsEvents.DELETE_RECORD_FAIL:
      return {
        ...state,
        records: state.records.map(val =>
          val.id === action.payload
            ? { ...val, isDeleting: false, isFetchingFailed: true }
            : val
        ),
      };
    case CallRecordsEvents.LOAD_MORE_RECORDS_REQUEST:
      return { ...state, isLoadingMore: true, isLoadingMoreFailed: false };
    case CallRecordsEvents.LOAD_MORE_RECORDS_SUCCESS:
      return {
        ...state,
        page: state.page + 1,
        records: [...state.records, ...action.payload.records],
        hasMoreRecords: action.payload.hasMoreRecords,
        isLoadingMore: false,
      };
    case CallRecordsEvents.LOAD_MORE_RECORDS_FAIL:
      return { ...state, isLoadingMore: false, isLoadingMoreFailed: true };
    case CallRecordsEvents.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case CallRecordsEvents.SET_SORTING:
      return { ...state, sorting: action.payload };
    case CallRecordsEvents.SET_DATE_INTERVAL:
      return { ...state, dateInterval: action.payload };
    case CallRecordsEvents.SET_CALL_DIRECTION:
      return { ...state, direction: action.payload };
    default:
      exhaustiveCheck(action);
      return state;
  }
}
