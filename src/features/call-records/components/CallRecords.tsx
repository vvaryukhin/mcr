import React, { useEffect } from 'react';
import CallRecordsList from './CallRecordsList';
import CallRecordsService from '../services';
import { setRecords, ICallRecordAction } from '../store/actions';
import { ICallRecord } from '../types';
import { connect } from 'react-redux';
import type { IAppState } from 'store';
import type { Dispatch } from 'redux';

interface IProps {
  records: ICallRecord[];
  setRecords: (records: ICallRecord[]) => void;
}

function CallRecords({ records, setRecords }: IProps) {
  useEffect(() => {
    CallRecordsService.fetch({ number: '12342323' }).then(res => {
      setRecords(res);
    });
  }, [setRecords]);

  return <CallRecordsList records={records} />;
}

const mapStateToProps = (state: IAppState) => {
  return {
    records: state.callRecords.records,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ICallRecordAction>) => {
  return {
    setRecords: (records: ICallRecord[]) => {
      dispatch(setRecords(records));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CallRecords);
