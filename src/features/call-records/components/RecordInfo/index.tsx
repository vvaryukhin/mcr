import React from 'react';
// import Highlight from 'components/Highlight';
import {
  CallDirections,
  ICallRecord,
  // ITranscription,
} from 'features/call-records/types';
import { timestampToDateString } from 'features/call-records/utils';
import { classNames, id /* , isNumber */, secondsToHHMMSS } from 'utils';

import { ReactComponent as ArrowUpRight } from 'assets/images/arrow-up-right.svg';
import { ReactComponent as ArrowDownLeft } from 'assets/images/arrow-down-left.svg';

import './index.scss';

interface IRecordInfo {
  record: ICallRecord;
  hasDuration?: boolean;
  theme?: RecordInfoTheme;
  searchQuery?: string;
}

type RecordInfoTheme = 'default' | 'light' | 'error';

const RecordInfo = ({
  record,
  hasDuration = true,
  theme = 'default',
}: // searchQuery,
IRecordInfo) => {
  const name = getCollocutorName(record);
  return (
    <div>
      <div
        className={`record-info ${classNames({
          'record-info--light': theme === 'light',
          'record-info--error': theme === 'error',
        })}`}
      >
        <div className="record-info__collocutor">
          <h4 className="heading record-info__name">
            {name || record.collocutor.phone}
          </h4>
        </div>
        {name && (
          <div style={{ marginBottom: 5 }}>Mobile {record.collocutor.phone}</div>
        )}
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
    </div>
  );
};

function getCollocutorName(record: ICallRecord) {
  const {
    collocutor: { firstName, lastName, middleName },
  } = record;
  const definedNames = [firstName, lastName, middleName].filter(id);
  return definedNames.join(' ');
}

export default RecordInfo;
