import { ICallRecord, CallRecordsSortingTypes, IDateInterval } from '../types';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

interface IFindRecordOptions {
  dateInterval?: IDateInterval;
  phoneNumber?: string;
  sorting?: CallRecordsSortingTypes;
}

export function find({
  dateInterval,
  sorting,
  phoneNumber,
}: IFindRecordOptions = {}) {
  console.log(sorting, dateInterval);
  if (!phoneNumber) {
    return fetch();
  }
  return findByNumber({ phoneNumber });
}

export async function fetch() {
  await sleep(500);
  return getRecords();
}

export async function findByNumber({ phoneNumber }: { phoneNumber: string }) {
  await sleep(500);
  return getRecords().filter(record => {
    const {
      collocutor: { phone },
    } = record;
    const queryPhoneDigits = phoneNumber.replace(/\D/g, '');
    return phone.replace(/\D/g, '').includes(queryPhoneDigits);
  });
}

export default {
  find,
  fetch,
  findByNumber,
};

function getRecords(): ICallRecord[] {
  return [
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
    {
      id: 2,
      direction: 'incoming',
      collocutor: {
        firstName: 'Александр',
        lastName: 'Александров',
        middleName: 'Александрович',
        phone: '+7 (228) 228-14-88',
      },
      record: {
        id: 2,
        file: '',
        duration: 10000,
        transcriptions: [
          {
            text: 'Здарова',
            createdAt: 10000000,
          },
          {
            text: 'Привет!',
            createdAt: 10000001,
          },
          {
            text: 'Как сам?',
            createdAt: 10000002,
          },
          {
            text: 'Как джип нисан.',
            createdAt: 10000003,
          },
        ],
      },
      createdAt: 10000000,
      deletedAt: null,
    },
  ];
}
