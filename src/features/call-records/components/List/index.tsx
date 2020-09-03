import React, { useEffect } from 'react';
import CallRecordsList from './component';
import CallRecordsService from '../../services';
import { setRecords } from '../../store/actions';
import { ICallRecord, CallRecordsSortingTypes } from '../../types';
import { connect } from 'react-redux';
import { IAppState } from 'store';

interface IProps {
  sorting: CallRecordsSortingTypes;
  searchQuery: string;
  records: ICallRecord[];
  setRecords: (records: ICallRecord[]) => void;
}

function CallRecords({ sorting, searchQuery, records, setRecords }: IProps) {
  useEffect(() => {
    console.log('effect...');
    CallRecordsService.find({ sorting, phoneNumber: searchQuery }).then(res => {
      setRecords(res);
    });
  }, [sorting, searchQuery, setRecords]);

  return <CallRecordsList records={records} />;
}

const mapStateToProps = (state: IAppState) => {
  return {
    records: state.callRecords.records,
    searchQuery: state.callRecords.searchQuery,
    sorting: state.callRecords.sorting,
  };
};

const mapDispatchToProps = {
  setRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallRecords);
