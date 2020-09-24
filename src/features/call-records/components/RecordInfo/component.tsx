import React from 'react';
import { CallDirections, ICallRecord } from 'features/call-records/types';
import { secondsToHHMMSS } from 'utils';

const getName = (record: ICallRecord) => {
  const { firstName, lastName, middleName } = record.collocutor;
  if (firstName && lastName && middleName) {
    return `${lastName} ${firstName} ${middleName}`;
  }
  return null;
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
  const collocutorName = getName(record);
  return (
    <>
      <h2>Ваш звонок</h2>
      {collocutorName && <h5 className="heading">{collocutorName}</h5>}
      <div>Длительность: {secondsToHHMMSS(record.record.duration)}</div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPlayingRecord(record)}>Play</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div>Transcription:</div>
        <button onClick={toggleShowTranscription}>
          {showTranscription ? 'close' : 'open'}
        </button>
        {showTranscription && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {record.record.transcriptions.map(
              ({ id, text, createdAt, direction }) => (
                <div
                  style={{
                    borderRadius: '3px',
                    maxWidth: '80%',
                    padding: '8px',
                    margin: '5px 0',
                    background: 'lightblue',
                    alignSelf:
                      direction === CallDirections.INCOMING
                        ? 'flex-start'
                        : 'flex-end',
                  }}
                  key={'message-' + id}
                >
                  <div>{text}</div>
                  <div style={{ textAlign: 'right', fontSize: '10px' }}>
                    {timestampMessageTime(createdAt)}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RecordInfoView;
