import React from 'react';
import { ICallRecord } from 'features/call-records/types';
import { secondsToHHMMSS } from 'utils';

const getName = (record: ICallRecord) => {
  const { firstName, lastName, middleName } = record.collocutor;
  return `${lastName} ${firstName} ${middleName}`;
};

const timestampMessageTime = (timestamp: number) => {
  return new Date(timestamp).toISOString().substr(11, 5);
};

export interface IRecordInfoViewProps {
  record: ICallRecord;
  setPlayingRecord: (record: ICallRecord) => void;
  showTranscription: boolean;
  toggleShowTranscription: () => void;
}

const RecordInfoView = ({
  record,
  setPlayingRecord,
  showTranscription,
  toggleShowTranscription,
}: IRecordInfoViewProps) => {
  return (
    <>
      <h2>Ваш звонок</h2>
      <h5>{getName(record)}</h5>
      <div>Длительность: {secondsToHHMMSS(record.record.duration)}</div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPlayingRecord(record)}>Play</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div>Transcription:</div>
        <button onClick={toggleShowTranscription}>
          {showTranscription ? 'close' : 'open'}
        </button>
        {showTranscription ? (
          <div>
            {record.record.transcriptions.map(({ text, createdAt }) => (
              <div
                style={{
                  padding: '8px',
                  margin: '10px 0',
                  background: 'lightblue',
                }}
                key={'message-' + createdAt}
              >
                <div>{text}</div>
                <small>{timestampMessageTime(createdAt)}</small>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default RecordInfoView;
