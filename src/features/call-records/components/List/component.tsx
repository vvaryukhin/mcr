import React from 'react';
import { ICallRecord } from 'features/call-records/types';

interface ICallRecordsListProps {
  records?: ICallRecord[];
  deleteRecord: (id: number) => void;
  setPlayingRecord: (recordId: number) => void;
}

const CallRecordsList: React.FC<ICallRecordsListProps> = ({
  records = [],
  deleteRecord,
  setPlayingRecord,
}) => {
  return (
    <ul>
      {records.map(call => {
        return (
          <li
            onClick={() => setPlayingRecord(call.id)}
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
              <a href={'/records/' + call.id}>Подробнее</a>
            </div>

            <div
              onClick={e => {
                e.stopPropagation();
                deleteRecord(call.id);
              }}
            >
              <button>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CallRecordsList;
