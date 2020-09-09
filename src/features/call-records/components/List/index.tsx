import React, { useEffect } from 'react';
import CallRecordsList, { ICallRecordsListProps } from './component';
import {
  fetchRecords,
  deleteRecordRequest,
  IFetchRecordsOptions,
} from 'features/call-records/store';
import {
  CallRecordsSortingTypes,
  IDateInterval,
  CallDirectionTypes,
} from 'features/call-records/types';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { setPlayingRecord } from 'features/audio-player/store';

interface IProps extends ICallRecordsListProps {
  dateInterval: IDateInterval;
  sorting: CallRecordsSortingTypes;
  searchQuery: string;
  direction: CallDirectionTypes;
  fetchRecords: (options: IFetchRecordsOptions) => void;
}

function CallRecords({
  dateInterval,
  sorting,
  searchQuery,
  records,
  fetchRecords,
  deleteRecord,
  direction,
  setPlayingRecord,
  isLoading,
  isFailed,
}: IProps) {
  useEffect(() => {
    console.log('effect...');
    fetchRecords({
      dateInterval,
      sorting,
      searchQuery,
      direction,
    });
  }, [direction, dateInterval, sorting, searchQuery, fetchRecords]);

  return (
    <CallRecordsList
      records={records}
      deleteRecord={deleteRecord}
      setPlayingRecord={setPlayingRecord}
      isLoading={isLoading}
      isFailed={isFailed}
    />
  );
}

const mapStateToProps = (state: IAppState) => {
  return {
    dateInterval: state.callRecords.dateInterval,
    records: state.callRecords.records,
    searchQuery: state.callRecords.searchQuery,
    sorting: state.callRecords.sorting,
    direction: state.callRecords.direction,
    isLoading: state.callRecords.isLoading,
    isFailed: state.callRecords.isFailed,
  };
};

const mapDispatchToProps = {
  fetchRecords,
  deleteRecord: deleteRecordRequest,
  setPlayingRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallRecords);
