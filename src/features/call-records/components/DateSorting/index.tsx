import DateSorting from './component';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { setDateInterval } from 'features/call-records/store/actions';

const mapStateToProps = (state: IAppState) => {
  return {
    dateInterval: state.callRecords.dateInterval,
  };
};

const mapDispatchToProps = {
  setDateInterval,
};

export default connect(mapStateToProps, mapDispatchToProps)(DateSorting);
