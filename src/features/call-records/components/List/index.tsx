import CallRecords from './component';
import { fetchRecords, loadMoreRecords } from 'features/call-records/store';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { setPlayingRecord } from 'features/audio-player/store';

const mapStateToProps = (state: IAppState) => {
  return {
    records: state.callRecords.records,
    isFetching: state.callRecords.isFetching,
    isFetchingFailed: state.callRecords.isFetchingFailed,
    playingRecord: state.audioPlayer.playingRecord,
    dateInterval: state.callRecords.dateInterval,
    sorting: state.callRecords.sorting,
    searchQuery: state.callRecords.searchQuery,
    direction: state.callRecords.direction,
    hasMoreRecords: state.callRecords.hasMoreRecords,
    isLoadingMore: state.callRecords.isLoadingMore,
    isLoadingMoreFailed: state.callRecords.isLoadingMoreFailed,
  };
};

const mapDispatchToProps = {
  fetchRecords,
  loadMoreRecords,
  setPlayingRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallRecords);
