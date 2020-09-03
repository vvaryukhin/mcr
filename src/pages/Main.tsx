import React from 'react';
import CallRecordsList from 'features/call-records/components/List';
import CallRecordsSearch from 'features/call-records/components/Search';
import CallRecordsSorting from 'features/call-records/components/Sorting';

function Main() {
  return (
    <div>
      <h2>Ваши звонки</h2>
      <CallRecordsSorting />
      <CallRecordsSearch />
      <CallRecordsList />
    </div>
  );
}

export default Main;
