import React, { useEffect } from 'react';
import CallRecordsList from './component';
import CallRecordsService from '../../services';
import { setRecords } from '../../store/actions';
import { ICallRecord, CallRecordsSortingTypes, IDateInterval } from '../../types';
import { connect } from 'react-redux';
import { IAppState } from 'store';

interface IProps {
  dateInterval: IDateInterval;
  sorting: CallRecordsSortingTypes;
  searchQuery: string;
  records: ICallRecord[];
  setRecords: (records: ICallRecord[]) => void;
}

function CallRecords({
  dateInterval,
  sorting,
  searchQuery,
  records,
  setRecords,
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

  return <CallRecordsList records={records} />;
}

const mapStateToProps = (state: IAppState) => {
  return {
    dateInterval: state.callRecords.dateInterval,
    records: state.callRecords.records,
    searchQuery: state.callRecords.searchQuery,
    sorting: state.callRecords.sorting,
  };
};

const mapDispatchToProps = {
  setRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallRecords);
