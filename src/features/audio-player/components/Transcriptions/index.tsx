import React from 'react';
import { CallDirections, ITranscription } from 'features/call-records/types';
import { classNames } from 'utils';

import './index.scss';

interface ITranscriptionsProps {
  transcriptions: ITranscription[];
}

const Transcription = ({ transcriptions }: ITranscriptionsProps) => {
  return (
    <div className="transcription">
      <h4 className="heading heading--light transcription__title">Transcription</h4>
      {transcriptions.map(({ id, text, createdAt, direction }) => (
        <div
          className={`transcription__item ${classNames({
            'transcription__item--incoming': direction === CallDirections.INCOMING,
            'transcription__item--outcoming': direction === CallDirections.OUTCOMING,
          })}`}
          key={'message-' + id}
          data-message-id={id}
        >
          <div className="transcription__text">{text}</div>
          <div className="transcription__time">
            {timestampMessageTime(createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

function timestampMessageTime(timestamp: number) {
  return new Date(timestamp).toISOString().substr(11, 5);
}

export default Transcription;
