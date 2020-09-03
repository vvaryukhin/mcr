import React from 'react';
import { ICallRecord } from '../../types';

interface ICallRecordsListProps {
  records?: ICallRecord[];
}

const CallRecordsList: React.FC<ICallRecordsListProps> = ({ records = [] }) => {
  return (
    <ul>
      {records.map(call => {
        return (
          <li
            key={call.id}
            style={{
              background: '#eee',
              padding: '10px',
              fontSize: '12px',
              borderRadius: 3,
            }}
          >
            <div style={{ padding: 5 }}>
              Имя собеседника – {call.collocutor.firstName}
            </div>
            <div style={{ padding: 5 }}>
              Телефон собеседника – {call.collocutor.phone}
            </div>
            <div style={{ padding: 5 }}>
              Длительность разговора – {call.record.duration}
            </div>
            <div style={{ padding: 5 }}>
              <a href={'/records/' + call.record.id}>Подробнее</a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CallRecordsList;
