import React from 'react';
import { CallDirections, ICallRecord } from 'features/call-records/types';
import { timestampToDateString } from 'features/call-records/utils';
import { classNames, secondsToHHMMSS } from 'utils';
import getCollocutor from 'features/call-records/utils/get-collocutor';

import { ReactComponent as ArrowUpRight } from 'assets/images/arrow-up-right.svg';
import { ReactComponent as ArrowDownLeft } from 'assets/images/arrow-down-left.svg';

import './index.scss';

interface IRecordInfo {
  record: ICallRecord;
  hasDuration?: boolean;
  theme?: RecordInfoTheme;
}

type RecordInfoTheme = 'default' | 'light' | 'error';

const RecordInfo = ({
  record,
  hasDuration = true,
  theme = 'default',
}: IRecordInfo) => {
  return (
    <div
      className={`record-info ${classNames({
        'record-info--light': theme === 'light',
        'record-info--error': theme === 'error',
      })}`}
    >
      <div className="record-info__collocutor">
        <h4 className="heading record-info__name">{getCollocutor(record)}</h4>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {record.direction === CallDirections.INCOMING ? (
          <ArrowDownLeft className="record-info__call-direction" />
        ) : (
          <ArrowUpRight className="record-info__call-direction" />
        )}
        <span className="record-info__date">
          {timestampToDateString({ timestamp: record.createdAt, separator: ' ' })}
        </span>
        {hasDuration && secondsToHHMMSS(record.record.duration)}
      </div>
    </div>
  );
};

export default RecordInfo;
