import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toInt } from 'utils';
import CallRecordsService from 'features/call-records/services';
import { ICallRecord } from 'features/call-records/types';
import { setPlayingRecord } from 'features/audio-player/store';
import { connect } from 'react-redux';
import RecordInfoView from './component';
import { useToggle } from 'hooks';

interface IRecordProps {
  setPlayingRecord: (record: ICallRecord) => void;
}

const RecordInfo = ({ setPlayingRecord }: IRecordProps) => {
  const [record, setRecord] = useState<ICallRecord>();
  const params = useParams<{ id: string }>();
  const [showTranscription, toggleShowTranscription] = useToggle();

  useEffect(() => {
    const id = toInt(params.id);
    if (id > -1) {
      CallRecordsService.findById(id).then(record => {
        setRecord(record);
      });
    }
  }, [params.id]);

  return (
    <div>
      {record ? (
        <RecordInfoView
          record={record}
          setPlayingRecord={setPlayingRecord}
          showTranscription={showTranscription}
          toggleShowTranscription={toggleShowTranscription}
        />
      ) : (
        <h2 className="heading">Loading...</h2>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  setPlayingRecord,
};

export default connect(null, mapDispatchToProps)(RecordInfo);
