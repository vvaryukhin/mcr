import React, { useState } from 'react';
import CallRecordsList from 'features/call-records/components/List';
import CallRecordsSearch from 'features/call-records/components/Search';
import CallDirectionSelect from 'features/call-records/components/CallDirection';
import AudioPlayer from 'features/audio-player/components/AudioPlayer';
import ContextMenu from 'features/call-records/components/ContextMenu';
import { ICallRecord } from 'features/call-records/types';

const Main = () => {
  const [openedMenuRecord, setOpenedMenuRecord] = useState<ICallRecord>();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <h2 className="heading">Ваши звонки</h2>
      </div>
      <CallDirectionSelect />
      <CallRecordsSearch />
      <CallRecordsList setOpenedMenu={setOpenedMenuRecord} />
      <ContextMenu
        record={openedMenuRecord}
        onClose={() => setOpenedMenuRecord(undefined)}
      />
      <AudioPlayer setOpenedMenu={setOpenedMenuRecord} />
    </div>
  );
};

export default Main;
