import OrderSorting from './component';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { setSorting } from 'features/call-records/store/actions';

const mapStateToProps = (state: IAppState) => {
  return {
    selectedSorting: state.callRecords.sorting,
  };
};

const mapDispatchToProps = {
  setSorting,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSorting);
