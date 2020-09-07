import Search from './component';
import { connect } from 'react-redux';
import { debounce } from 'utils';
import {
  setSearchQuery,
  ICallRecordAction,
} from 'features/call-records/store/actions';
import { Dispatch } from 'redux';
import { IAppState } from 'store';

const mapStateToProps = (state: IAppState) => {
  return {
    query: state.callRecords.searchQuery,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ICallRecordAction>) => {
  return {
    setSearchQuery: debounce(200, (query: string) => {
      dispatch(setSearchQuery(query));
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
