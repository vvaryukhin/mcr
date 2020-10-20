import { baseURL } from 'env';
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
import {
  hasOwn,
  isArray,
  isNumber,
  isObject,
  isString,
  id as identity,
  uniq,
  isBoolean,
} from 'utils';
import { request } from 'utils';

interface IFindRecordOptions {
  id?: number;
  dateInterval?: IDateInterval;
  searchQuery?: string;
  sorting?: CallRecordsSortingTypes;
  direction?: CallDirectionFilters;
  page?: number;
}

export interface IFindRecordsResult {
  hasMoreRecords: boolean;
  records: ICallRecord[];
}

export async function find({
  id,
  dateInterval,
  sorting,
  searchQuery,
  direction,
  page,
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
    ifDefined(page, 'page'),
  ]
    .filter(identity)
    .join('&');
  return request(`/records?${queryParams}`, { headers: authHeader() }).then(
    (data: unknown): IFindRecordsResult =>
      isObject(data)
        ? {
            records: callRecordsAdapter(data.records),
            hasMoreRecords: isBoolean(data.hasMoreRecords)
              ? data.hasMoreRecords
              : false,
          }
        : { hasMoreRecords: false, records: [] }
  );
}

export async function findById(id: number) {
  await sleep(1500);
  return globalThis
    .fetch(`${baseURL}/records/${id}`, { headers: authHeader() })
    .then(res => res.json())
    .then(v => v as ICallRecord);
}

export async function remove(id: number) {
  /* return  */ await sleep(1500);
  return request(`/records/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
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

function authHeader() {
  const token = sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : undefined;
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
