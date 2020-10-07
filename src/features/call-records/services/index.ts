import { __DEV__ } from 'env';
import {
  ICallRecord,
  IDateInterval,
  CallDirectionFilters,
  CallRecordsSortingTypes,
  CallDirections,
  ICollocutor,
  IRecord,
  ITranscription,
} from '../types';
import { hasOwn, isArray, isNumber, isObject, isString, uniq } from 'utils';

const baseURL = process.env.REACT_APP_REQUEST_BASE_URL || '';

interface IFindRecordOptions {
  id?: number;
  dateInterval?: IDateInterval;
  searchQuery?: string;
  sorting?: CallRecordsSortingTypes;
  direction?: CallDirectionFilters;
}

export async function find({
  id,
  dateInterval,
  sorting,
  searchQuery,
  direction,
}: IFindRecordOptions = {}) {
  await sleep(1500);
  const ifDefined = (v: string | number | undefined, k: string) =>
    v ? `${k}=${encodeURIComponent(v)}` : '';
  const { from, to } = dateInterval || {};
  const queryParams = [
    ifDefined(id, 'from'),
    ifDefined(from, 'from'),
    ifDefined(to, 'to'),
    ifDefined(sorting, 'sorting'),
    ifDefined(searchQuery, 'q'),
    ifDefined(direction, 'direction'),
  ]
    .filter(v => v)
    .join('&');
  return globalThis
    .fetch(`${baseURL}/records?${queryParams}`)
    .then(res => res.json())
    .then(callRecordsAdapter)
    .catch(e => {
      // TODO delete
      if (__DEV__) return json;
      throw e;
    });
}

export async function findById(id: number) {
  await sleep(1500);
  return globalThis
    .fetch(`${baseURL}/records/${id}`)
    .then(res => res.json())
    .then(v => v as ICallRecord);
}

export async function remove(id: number) {
  await sleep(1500);
  // return Promise.reject();
  return globalThis
    .fetch(`${baseURL}/records/${id}`, { method: 'DELETE' })
    .then(res => res.json());
}

const CallRecordsService = {
  find,
  findById,
  remove,
};

export default CallRecordsService;

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

function callRecordsAdapter(records: unknown): ICallRecord[] {
  if (isArray(records)) {
    return records.filter(isObject).map(val => ({
      id: isNumber(val.id) ? val.id : uniq.id,
      // TODO think about adding `CallDirections.UNKNOWN`
      // instead of using `CallDirections.INCOMING` as default value
      direction: hasOwn(CallDirections, val.direction)
        ? (val.direction as CallDirections)
        : CallDirections.INCOMING,
      record: recordAdapter(val.record),
      collocutor: collocutorAdapter(val.collocutor),
      createdAt: timestampAdapter(val.deletedAt, Date.now()),
      deletedAt: timestampAdapter(val.deletedAt, null),
      isDeleting: false,
      isFailed: false,
    }));
  }
  return [];
}

function recordAdapter(val: unknown): IRecord {
  const record = isObject(val) ? val : {};
  return {
    id: isNumber(record.id) ? record.id : uniq.id,
    file: isString(record.file) ? record.file : '',
    duration: isNumber(record.duration) ? record.duration : -1,
    transcriptions: transcriptionsAdapter(record.transcriptions),
  };
}

function transcriptionsAdapter(transcriptions: unknown): ITranscription[] {
  if (!isArray(transcriptions)) {
    return [];
  }
  return transcriptions.filter(isObject).map(val => ({
    id: isNumber(val.id) ? val.id : uniq.id,
    text: isString(val.text) ? val.text : '',
    direction: hasOwn(CallDirections, val.direction)
      ? (val.direction as CallDirections)
      : CallDirections.INCOMING,
    createdAt: timestampAdapter(val.deletedAt, Date.now()),
  }));
}

function collocutorAdapter(val: unknown): ICollocutor {
  if (!isObject(val)) {
    return { phone: 'unknown' };
  }

  const { phone, firstName, lastName, middleName } = val;

  const result = {
    phone: isString(phone) ? phone : 'unknown',
    firstName: isString(firstName) ? firstName : undefined,
    lastName: isString(lastName) ? lastName : undefined,
    middleName: isString(middleName) ? middleName : undefined,
  };

  return result;
}

function timestampAdapter<T>(val: unknown, defaultValue: T) {
  return isNumber(val) && !isNaN(val) && isFinite(val) ? val : defaultValue;
}

// TODO delete
const json: ICallRecord[] = [
  {
    id: 18,
    direction: CallDirections.INCOMING,
    collocutor: {
      firstName: 'Providenci',
      middleName: 'Arlene',
      lastName: 'Anderson',
      phone: '745-886-5681 x761',
    },
    record: {
      id: 19,
      duration: 1968,
      file:
        'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      transcriptions: [
        {
          id: 20,
          text: 'static interfaces hardware',
          createdAt: 1598822100000,
          direction: CallDirections.OUTCOMING,
        },
      ],
    },
    createdAt: 1601013755990,
    deletedAt: null,
    isDeleting: false,
    isFailed: false,
  },
  {
    id: 21,
    direction: CallDirections.OUTCOMING,
    collocutor: {
      firstName: 'Bailey',
      middleName: 'Ruthie',
      lastName: 'Prosacco',
      phone: '859.532.6897 x0589',
    },
    record: {
      id: 22,
      duration: 2379,
      file:
        'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      transcriptions: [
        {
          id: 23,
          text: 'AI bleeding-edge',
          createdAt: 1598822160000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 24,
          text: 'Towels Concrete Garden',
          createdAt: 1598822220000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 25,
          text: 'Bike mobile deliver',
          createdAt: 1598822280000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 26,
          text: 'primary auxiliary',
          createdAt: 1598822340000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 27,
          text: 'syndicate',
          createdAt: 1598822400000,
          direction: CallDirections.OUTCOMING,
        },
      ],
    },
    createdAt: 1601014889301,
    deletedAt: null,
    isDeleting: false,
    isFailed: false,
  },
  {
    id: 28,
    direction: CallDirections.INCOMING,
    collocutor: {
      firstName: 'Andres',
      middleName: 'Ephraim',
      lastName: 'Rowe',
      phone: '863-437-4224',
    },
    record: {
      id: 29,
      duration: 6564,
      file: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg',
      transcriptions: [
        {
          id: 30,
          text: 'Ranch',
          createdAt: 1598822460000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 31,
          text: 'Hat Gorgeous Wooden',
          createdAt: 1598822520000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 32,
          text: 'Identity Grocery',
          createdAt: 1598822580000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 33,
          text: 'Highway',
          createdAt: 1598822640000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 34,
          text: 'compelling parse Rand',
          createdAt: 1598822700000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 35,
          text: 'Quality-focused driver tan',
          createdAt: 1598822760000,
          direction: CallDirections.INCOMING,
        },
      ],
    },
    createdAt: 1600996930086,
    deletedAt: null,
    isDeleting: false,
    isFailed: false,
  },
  {
    id: 36,
    direction: CallDirections.OUTCOMING,
    collocutor: {
      firstName: 'Melyna',
      middleName: 'Timmy',
      lastName: 'Kunde',
      phone: '353.569.0149',
    },
    record: {
      id: 37,
      duration: 2920,
      file:
        'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      transcriptions: [
        {
          id: 38,
          text: 'Plastic',
          createdAt: 1598822820000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 39,
          text: 'Palladium',
          createdAt: 1598822880000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 40,
          text: 'Sleek',
          createdAt: 1598822940000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 41,
          text: 'Industrial Licensed SSL',
          createdAt: 1598823000000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 42,
          text: 'Intelligent mobile',
          createdAt: 1598823060000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 43,
          text: 'platforms',
          createdAt: 1598823120000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 44,
          text: 'infrastructure National',
          createdAt: 1598823180000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 45,
          text: 'ubiquitous payment',
          createdAt: 1598823240000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 46,
          text: 'array',
          createdAt: 1598823300000,
          direction: CallDirections.INCOMING,
        },
      ],
    },
    createdAt: 1600980304966,
    deletedAt: null,
    isDeleting: false,
    isFailed: false,
  },
  {
    id: 47,
    direction: CallDirections.INCOMING,
    collocutor: {
      firstName: 'Issac',
      middleName: 'Hulda',
      lastName: 'Fahey',
      phone: '711-634-2131 x54561',
    },
    record: {
      id: 48,
      duration: 1049,
      file: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg',
      transcriptions: [
        {
          id: 49,
          text: 'PNG Coordinator',
          createdAt: 1598823360000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 50,
          text: 'pixel Administrator',
          createdAt: 1598823420000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 51,
          text: 'protocol Towels Pants',
          createdAt: 1598823480000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 52,
          text: 'Seamless',
          createdAt: 1598823540000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 53,
          text: 'wireless withdrawal',
          createdAt: 1598823600000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 54,
          text: 'focus partnerships Synergized',
          createdAt: 1598823660000,
          direction: CallDirections.OUTCOMING,
        },
      ],
    },
    createdAt: 1601010408243,
    deletedAt: null,
    isDeleting: false,
    isFailed: false,
  },
  {
    id: 55,
    direction: CallDirections.INCOMING,
    collocutor: {
      firstName: 'Helene',
      middleName: 'Isac',
      lastName: 'Wunsch',
      phone: '(865) 307-2325 x992',
    },
    record: {
      id: 56,
      duration: 6737,
      file:
        'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      transcriptions: [
        {
          id: 57,
          text: 'Vietnam Shoes',
          createdAt: 1598823720000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 58,
          text: 'payment Marketing Solutions',
          createdAt: 1598823780000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 59,
          text: 'Soft Palladium Algerian',
          createdAt: 1598823840000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 60,
          text: 'Berkshire',
          createdAt: 1598823900000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 61,
          text: 'purple XSS',
          createdAt: 1598823960000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 62,
          text: 'seamless',
          createdAt: 1598824020000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 63,
          text: 'FTP black',
          createdAt: 1598824080000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 64,
          text: 'Frozen',
          createdAt: 1598824140000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 65,
          text: 'Island Bedfordshire matrix',
          createdAt: 1598824200000,
          direction: CallDirections.INCOMING,
        },
      ],
    },
    createdAt: 1600933103659,
    deletedAt: null,
    isDeleting: false,
    isFailed: false,
  },
  {
    id: 66,
    direction: CallDirections.OUTCOMING,
    collocutor: {
      firstName: 'Chelsey',
      middleName: 'Jacynthe',
      lastName: 'Satterfield',
      phone: '845.368.1496',
    },
    record: {
      id: 67,
      duration: 1300,
      file: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg',
      transcriptions: [
        {
          id: 68,
          text: 'Account Fantastic District',
          createdAt: 1598824260000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 69,
          text: 'eco-centric Sports Granite',
          createdAt: 1598824320000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 70,
          text: 'Harbor',
          createdAt: 1598824380000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 71,
          text: 'Euro project',
          createdAt: 1598824440000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 72,
          text: 'Incredible expedite',
          createdAt: 1598824500000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 73,
          text: 'Iowa',
          createdAt: 1598824560000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 74,
          text: 'PCI',
          createdAt: 1598824620000,
          direction: CallDirections.INCOMING,
        },
        {
          id: 75,
          text: 'Vietnam Bedfordshire Georgia',
          createdAt: 1598824680000,
          direction: CallDirections.INCOMING,
        },
      ],
    },
    createdAt: 1600985161748,
    deletedAt: null,
    isDeleting: false,
    isFailed: false,
  },
  {
    id: 76,
    direction: CallDirections.INCOMING,
    collocutor: {
      firstName: 'Llewellyn',
      middleName: 'Francisco',
      lastName: 'Lesch',
      phone: '836.477.5914 x1357',
    },
    record: {
      id: 77,
      duration: 4847,
      file:
        'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      transcriptions: [
        {
          id: 78,
          text: 'indigo virtual Colombia',
          createdAt: 1598824740000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 79,
          text: 'Car',
          createdAt: 1598824800000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 80,
          text: 'PCI Computers solid',
          createdAt: 1598824860000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 81,
          text: 'brand parsing violet',
          createdAt: 1598824920000,
          direction: CallDirections.OUTCOMING,
        },
        {
          id: 82,
          text: 'Account',
          createdAt: 1598824980000,
          direction: CallDirections.OUTCOMING,
        },
      ],
    },
    createdAt: 1600968188663,
    deletedAt: null,
    isDeleting: false,
    isFailed: false,
  },
];
