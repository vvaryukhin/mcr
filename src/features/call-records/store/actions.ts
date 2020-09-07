import { makeAction, IActionUnion } from 'store/utils';
import { CallRecordsEvents } from './events';
import {
  ICallRecord,
  CallRecordsSortingTypes,
  IDateInterval,
  CallDirectionTypes,
} from '../types';
import { Dispatch } from 'redux';
import CallRecordsService from '../services';

export const setRecords = makeAction<CallRecordsEvents.SET_RECORDS, ICallRecord[]>(
  CallRecordsEvents.SET_RECORDS
);

export const deleteRecord = makeAction<CallRecordsEvents.DELETE_RECORD, number>(
  CallRecordsEvents.DELETE_RECORD
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

export const setCallDirection = makeAction<
  CallRecordsEvents.SET_CALL_DIRECTION,
  CallDirectionTypes
>(CallRecordsEvents.SET_CALL_DIRECTION);

// async actions
export const deleteRecordRequest = (id: number) => (
  dispatch: Dispatch<ICallRecordAction>
) => {
  CallRecordsService.remove(id)
    .then(() => dispatch(deleteRecord(id)))
    .catch(console.error);
};

export interface IFetchRecordsOptions {
  dateInterval: IDateInterval;
  sorting: CallRecordsSortingTypes;
  searchQuery: string;
  direction: CallDirectionTypes;
}

export const fetchRecords = ({
  dateInterval,
  sorting,
  searchQuery,
  direction,
}: IFetchRecordsOptions) => (dispatch: Dispatch<ICallRecordAction>) => {
  CallRecordsService.find({
    dateInterval,
    sorting,
    searchQuery,
    direction,
  }).then(res => {
    dispatch(setRecords(res));
  });
};

const actions = {
  setRecords,
  deleteRecord,
  setSearchQuery,
  setSorting,
  setDateInterval,
  setCallDirection,
};

export type ICallRecordAction = IActionUnion<typeof actions>;
