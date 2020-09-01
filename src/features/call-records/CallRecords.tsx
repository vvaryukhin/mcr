import React from 'react';
import CallRecordsList from './CallRecordsList';

export default function CallRecords() {
  const records = [
    {
      id: 1,
      direction: 'incoming' as const,
      // contact_id: 1,
      collocutor: {
        firstname: 'Константин',
        lastname: 'Константинович',
        middlename: 'Константинопольский',
        phone: '+7 (926) 000-00-00',
      },
      // record_id: 1,
      record: {
        id: 1,
        file: '',
        duration: 10000,
        transcriptions: [
          {
            text: 'Привет',
            created_at: 10000000,
          },
          {
            text: 'Привет!',
            created_at: 10000001,
          },
          {
            text: 'Как дела?',
            created_at: 10000002,
          },
          {
            text: 'Нормально.',
            created_at: 10000003,
          },
        ],
      },
      created_at: 10000000,
      deleted_at: null,
    },
  ];

  return <CallRecordsList records={records} />;
}
