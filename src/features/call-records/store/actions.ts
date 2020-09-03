import { makeAction, IActionUnion } from 'store/utils';
import { CallRecordsEvents } from './events';
import { ICallRecord, CallRecordsSortingTypes, IDateInterval } from '../types';

export const setRecords = makeAction<CallRecordsEvents.SET_RECORDS, ICallRecord[]>(
  CallRecordsEvents.SET_RECORDS
);

export const setSearchQuery = makeAction<CallRecordsEvents.SET_SEARCH_QUERY, string>(
  CallRecordsEvents.SET_SEARCH_QUERY
);

export const setSorting = makeAction<
  CallRecordsEvents.SET_SORTING,
  CallRecordsSortingTypes
>(CallRecordsEvents.SET_SORTING);

export const setDateInterval = makeAction<
  CallRecordsEvents.SET_DATE_INTERVAL,
  IDateInterval
>(CallRecordsEvents.SET_DATE_INTERVAL);

const actions = {
  setRecords,
  setSearchQuery,
  setSorting,
  setDateInterval,
};

export type ICallRecordAction = IActionUnion<typeof actions>;

export default actions;
