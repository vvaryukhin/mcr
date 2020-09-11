import { connect } from 'react-redux';
import CallTypeSelect from './component';
import { IAppState } from 'store';
import { setCallDirection } from 'features/call-records/store/actions';

const mapStateToProps = (state: IAppState) => {
  return {
    direction: state.callRecords.direction,
  };
};

const mapDispatchToProps = {
  setCallDirection,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallTypeSelect);
