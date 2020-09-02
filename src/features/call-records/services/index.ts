import type { ICallRecord } from '../types';

interface ICallRecordsFetchOptions {
  number: string;
}

const records: ICallRecord[] = [
  {
    id: 1,
    direction: 'incoming',
    // contact_id: 1,
    collocutor: {
      firstName: 'Константин',
      lastName: 'Константинович',
      middleName: 'Константинопольский',
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
          createdAt: 10000000,
        },
        {
          text: 'Привет!',
          createdAt: 10000001,
        },
        {
          text: 'Как дела?',
          createdAt: 10000002,
        },
        {
          text: 'Нормально.',
          createdAt: 10000003,
        },
      ],
    },
    createdAt: 10000000,
    deletedAt: null,
  },
];

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function fetch({ number }: ICallRecordsFetchOptions) {
  console.log('fetching calls for number ' + number);
  await sleep(500);
  return records;
}

export default {
  fetch,
};
