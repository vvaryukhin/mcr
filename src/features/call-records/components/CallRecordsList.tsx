import React from 'react';
import { ICallRecord } from '../types';

interface CallRecordsListProps {
  records?: ICallRecord[];
}

const CallRecordsList: React.FC<CallRecordsListProps> = ({ records = [] }) => {
  return (
    <ul>
      {records.map(call => {
        return (
          <li key="{call.id}">
            <div>Имя собеседника – {call.collocutor.firstName}</div>
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

export default CallRecordsList;
