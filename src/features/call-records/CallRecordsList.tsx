import * as React from 'react';
import PropTypes from 'prop-types';
import { ICallRecord } from './interfaces';

interface CallRecordsListProps {
  records?: ICallRecord[];
}

const CallRecordsList: React.FC<CallRecordsListProps> = ({ records = [] }) => {
  return (
    <ul>
      {records.map(call => {
        return (
          <li key="{call.id}">
            <div>Имя собеседника – {call.collocutor.firstname}</div>
            <div>Телефон собеседника – {call.collocutor.phone}</div>
            <div>Длительность разговора – {call.record.duration}</div>
            <div>
              <a href={'/records/' + call.record.id}>Подробнее</a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

CallRecordsList.propTypes = {
  records: PropTypes.array,
};

export default CallRecordsList;
