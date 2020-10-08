import { makeAction, IActionUnion } from 'store/utils';
import { CallRecordsEvents } from './events';
import {
  ICallRecord,
  CallRecordsSortingTypes,
  IDateInterval,
  CallDirectionFilters,
} from '../types';
import { Dispatch } from 'redux';
import CallRecordsService from '../services';
import { history } from 'router';
import { error } from 'utils';
import { notify } from 'components/Notification';

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
  CallDirectionFilters
>(CallRecordsEvents.SET_CALL_DIRECTION);

export const requestRecords = makeAction(CallRecordsEvents.REQUEST_RECORDS);

export const requestRecordsSuccess = makeAction<
  CallRecordsEvents.REQUEST_RECORDS_SUCCESS,
  ICallRecord[]
>(CallRecordsEvents.REQUEST_RECORDS_SUCCESS);

export const requestRecordsFail = makeAction(CallRecordsEvents.REQUEST_RECORDS_FAIL);

const deleteRecordRequest = makeAction<
  CallRecordsEvents.DELETE_RECORD_REQUEST,
  number
>(CallRecordsEvents.DELETE_RECORD_REQUEST);

const deleteRecordSuccess = makeAction<
  CallRecordsEvents.DELETE_RECORD_SUCCESS,
  number
>(CallRecordsEvents.DELETE_RECORD_SUCCESS);

const deleteRecordFail = makeAction<CallRecordsEvents.DELETE_RECORD_FAIL, number>(
  CallRecordsEvents.DELETE_RECORD_FAIL
);

// async actions
export interface IFetchRecordsOptions {
  dateInterval: IDateInterval;
  sorting: CallRecordsSortingTypes;
  searchQuery: string;
  direction: CallDirectionFilters;
}

export const fetchRecords = ({
  dateInterval,
  sorting,
  searchQuery,
  direction,
}: IFetchRecordsOptions) => (dispatch: Dispatch<ICallRecordAction>) => {
  dispatch(requestRecords());
  CallRecordsService.find({
    dateInterval,
    sorting,
    searchQuery,
    direction,
  })
    .then(res => {
      dispatch(requestRecordsSuccess(res));
    })
    .catch(err => {
      if (err.status === 401 || err.status === 403) {
        notify({
          title: 'Authorization error',
          message: 'Log in to see your records',
        });
        return history.push('/login');
      }
      error(err);
      dispatch(requestRecordsFail());
    });
};

export const deleteRecord = (id: number) => (
  dispatch: Dispatch<ICallRecordAction>
) => {
  dispatch(deleteRecordRequest(id));
  CallRecordsService.remove(id)
    .then(() => dispatch(deleteRecordSuccess(id)))
    .catch(e => {
      dispatch(deleteRecordFail(id));
      error(e);
      notify({
        title: 'Error occurred',
        message:
          'Failed to delete record, ' +
          'check your internet connection and try again',
      });
    });
};

const actions = {
  setSearchQuery,
  setSorting,
  setDateInterval,
  setCallDirection,
  requestRecords,
  requestRecordsSuccess,
  requestRecordsFail,
  deleteRecordRequest,
  deleteRecordSuccess,
  deleteRecordFail,
};

export type ICallRecordAction = IActionUnion<typeof actions>;
