import React from 'react';
import { ICallRecord } from 'features/call-records/types';
import { Link } from 'react-router-dom';

export interface ICallRecordsListProps {
  records?: ICallRecord[];
  deleteRecord: (id: number) => void;
  setPlayingRecord: (record: ICallRecord) => void;
  isFailed: boolean;
  isLoading: boolean;
}

const CallRecordsList = ({
  records = [],
  deleteRecord,
  setPlayingRecord,
  isLoading,
  isFailed,
}: ICallRecordsListProps) => {
  return (
    <ul style={{ minHeight: '200px', position: 'relative' }}>
      {isLoading && (
        <div
          data-test-id="call-records-list/loader"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'red',
          }}
        ></div>
      )}
      {isFailed ? (
        <div data-test-id="call-records-list/error">
          Error ocurred. Check your internet connection.
        </div>
      ) : (
        records.map(call => {
          return (
            <li
              onClick={() => setPlayingRecord(call)}
              key={call.id}
              style={{
                background: '#eee',
                padding: '10px',
                fontSize: '12px',
                borderRadius: 3,
              }}
              data-test-id="call-records-list/item"
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
                <Link onClick={e => e.stopPropagation()} to={'/records/' + call.id}>
                  Подробнее
                </Link>
              </div>

              <div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    deleteRecord(call.id);
                  }}
                  data-test-id="call-records-list/item/delete"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default CallRecordsList;
