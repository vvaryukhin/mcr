import React, { useEffect } from 'react';
import CallRecordsList from './component';
import {
  fetchRecords,
  deleteRecordRequest,
  IFetchRecordsOptions,
} from 'features/call-records/store';
import {
  ICallRecord,
  CallRecordsSortingTypes,
  IDateInterval,
  CallDirectionTypes,
} from 'features/call-records/types';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { setPlayingRecord } from 'features/audio-player/store';

interface IProps {
  dateInterval: IDateInterval;
  sorting: CallRecordsSortingTypes;
  searchQuery: string;
  direction: CallDirectionTypes;
  records: ICallRecord[];
  fetchRecords: (options: IFetchRecordsOptions) => void;
  deleteRecord: (id: number) => void;
  setPlayingRecord: (recordId: number) => void;
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
  };
};

const mapDispatchToProps = {
  fetchRecords,
  deleteRecord: deleteRecordRequest,
  setPlayingRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallRecords);
