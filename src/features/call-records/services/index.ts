import {
  ICallRecord,
  IDateInterval,
  CallDirectionTypes,
  CallRecordsSortingTypes,
} from '../types';
// import config from 'config';

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

export async function findById(_id: number) {
  await sleep(500);
  return getRecords().find(({ id }) => id === _id);
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
  findById,
  findByNumber,
  remove,
};

export default CallRecordsService;

const ONE_MINUTE_IN_MS = 60_000;

function makeGetDate() {
  let date = new Date('08/31/2020').getTime();
  return function getDate() {
    date += ONE_MINUTE_IN_MS;
    return date;
  };
}

const getDate = makeGetDate();

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
            id: 5,
            text: 'Привет',
            createdAt: getDate(),
            direction: 'incoming',
          },
          {
            id: 6,
            text: 'Привет!',
            createdAt: getDate(),
            direction: 'outcoming',
          },
          {
            id: 7,
            text: 'Как дела?',
            createdAt: getDate(),
            direction: 'incoming',
          },
          {
            id: 8,
            text: 'Нормально.',
            createdAt: getDate(),
            direction: 'outcoming',
          },
        ],
      },
      createdAt: getDate(),
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
          { id: 1, text: 'Здарова', createdAt: getDate(), direction: 'outcoming' },
          {
            id: 2,
            text: 'Привет!',
            createdAt: getDate(),
            direction: 'incoming',
          },
          {
            id: 3,
            text: 'Как сам?',
            createdAt: getDate(),
            direction: 'outcoming',
          },
          {
            id: 4,
            text: 'Как джип нисан.',
            createdAt: getDate(),
            direction: 'incoming',
          },
        ],
      },
      createdAt: getDate(),
      deletedAt: null,
    },
  ];
}
