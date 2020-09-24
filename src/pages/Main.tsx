import React from 'react';
import CallRecordsList from 'features/call-records/components/List';
import CallRecordsSearch from 'features/call-records/components/Search';
import CallDirectionSelect from 'features/call-records/components/CallDirection';
import Filters from 'features/call-records/components/Filters';

function Main() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 className="heading">Ваши звонки</h2>
        <Filters />
      </div>
      <CallDirectionSelect />
      <CallRecordsSearch />
      <CallRecordsList />
    </div>
  );
}

export default Main;
