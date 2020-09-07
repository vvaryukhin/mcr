import React from 'react';
import CallRecordsList from 'features/call-records/components/List';
import CallRecordsSearch from 'features/call-records/components/Search';
import CallRecordsOrderSorting from 'features/call-records/components/OrderSorting';
import CallRecordsDateSorting from 'features/call-records/components/DateSorting';

function Main() {
  return (
    <div>
      <h2>Ваши звонки</h2>
      <CallRecordsDateSorting />
      <CallRecordsOrderSorting />
      <CallRecordsSearch />
      <CallRecordsList />
    </div>
  );
}

export default Main;
