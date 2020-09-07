import React from 'react';
import CallRecordsList from 'features/call-records/components/List';
import CallRecordsSearch from 'features/call-records/components/Search';
import CallRecordsOrderSorting from 'features/call-records/components/OrderSorting';
import CallRecordsDateSorting from 'features/call-records/components/DateSorting';
import CallDirectionSelect from 'features/call-records/components/CallDirection';

function Main() {
  return (
    <div>
      <h2>Ваши звонки</h2>
      <div style={{ border: '1px solid #333', padding: '5px', marginBottom: 10 }}>
        <CallRecordsDateSorting />
        <CallRecordsOrderSorting />
      </div>
      <CallDirectionSelect />
      <CallRecordsSearch />
      <CallRecordsList />
    </div>
  );
}

export default Main;
