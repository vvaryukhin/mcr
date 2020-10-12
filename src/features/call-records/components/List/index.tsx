import React, { useEffect } from 'react';
import CallRecordsList, { ICallRecordsListProps } from './component';
import {
  fetchRecords,
  deleteRecord,
  IFetchRecordsOptions,
} from 'features/call-records/store';
import {
  CallRecordsSortingTypes,
  IDateInterval,
  CallDirectionFilters,
} from 'features/call-records/types';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { setPlayingRecord } from 'features/audio-player/store';

interface IProps extends ICallRecordsListProps {
  dateInterval: IDateInterval;
  sorting: CallRecordsSortingTypes;
  searchQuery: string;
  direction: CallDirectionFilters;
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
  playingRecord,
  setPlayingRecord,
  isLoading,
  isFailed,
}: IProps) {
  useEffect(() => {
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
      playingRecord={playingRecord}
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
    playingRecord: state.audioPlayer.playingRecord,
  };
};

const mapDispatchToProps = {
  fetchRecords,
  deleteRecord,
  setPlayingRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallRecords);
