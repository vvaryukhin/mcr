import React, { useEffect } from 'react';
import CallRecordsList from './component';
import CallRecordsService from 'features/call-records/services';
import {
  setRecords,
  deleteRecord,
  ICallRecordAction,
} from 'features/call-records/store/actions';
import {
  ICallRecord,
  CallRecordsSortingTypes,
  IDateInterval,
} from 'features/call-records/types';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { Dispatch } from 'redux';

interface IProps {
  dateInterval: IDateInterval;
  sorting: CallRecordsSortingTypes;
  searchQuery: string;
  records: ICallRecord[];
  setRecords: (records: ICallRecord[]) => void;
  deleteRecord: (id: number) => void;
}

function CallRecords({
  dateInterval,
  sorting,
  searchQuery,
  records,
  setRecords,
  deleteRecord,
}: IProps) {
  useEffect(() => {
    console.log('effect...');
    CallRecordsService.find({
      dateInterval,
      sorting,
      phoneNumber: searchQuery,
    }).then(res => {
      setRecords(res);
    });
  }, [dateInterval, sorting, searchQuery, setRecords]);

  return <CallRecordsList records={records} deleteRecord={deleteRecord} />;
}

const mapStateToProps = (state: IAppState) => {
  return {
    dateInterval: state.callRecords.dateInterval,
    records: state.callRecords.records,
    searchQuery: state.callRecords.searchQuery,
    sorting: state.callRecords.sorting,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ICallRecordAction>) => {
  return {
    setRecords: (records: ICallRecord[]) => {
      dispatch(setRecords(records));
    },
    deleteRecord: (id: number) => {
      CallRecordsService.remove(id).then(() => dispatch(deleteRecord(id)));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CallRecords);
