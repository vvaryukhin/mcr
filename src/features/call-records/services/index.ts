import {
  ICallRecord,
  IDateInterval,
  CallDirectionTypes,
  CallRecordsSortingTypes,
} from '../types';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

interface IFindRecordOptions {
  dateInterval?: IDateInterval;
  searchQuery?: string;
  sorting?: CallRecordsSortingTypes;
  direction?: CallDirectionTypes;
}

export function find({
  dateInterval,
  sorting,
  searchQuery,
  direction,
}: IFindRecordOptions = {}) {
  console.log(direction, sorting, dateInterval);
  if (!searchQuery) {
    return fetch();
  }
  return findByNumber({ searchQuery });
}

export async function fetch() {
  await sleep(500);
  return getRecords();
}

export async function findByNumber({ searchQuery }: { searchQuery: string }) {
  await sleep(500);
  return getRecords().filter(record => {
    const {
      collocutor: { phone },
    } = record;
    const queryPhoneDigits = searchQuery.replace(/\D/g, '');
    return phone.replace(/\D/g, '').includes(queryPhoneDigits);
  });
}

// from what I remember you can not use delete
// in function names on ie
// TODO check wether it's possible
export async function remove(id: number) {
  console.log('deleted records with %s id', id);
  await sleep(500);
}

const CallRecordsService = {
  find,
  fetch,
  findByNumber,
  remove,
};

export default CallRecordsService;

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
        file:
          'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
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
        file: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg',
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
