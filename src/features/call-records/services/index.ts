import { isArray, isObject } from 'utils';
import {
  ICallRecord,
  IDateInterval,
  CallDirectionTypes,
  CallRecordsSortingTypes,
} from '../types';

const baseURL = process.env.REACT_APP_REQUEST_BASE_URL || '';

interface IFindRecordOptions {
  id?: number;
  dateInterval?: IDateInterval;
  searchQuery?: string;
  sorting?: CallRecordsSortingTypes;
  direction?: CallDirectionTypes;
}

export function find({
  id,
  dateInterval,
  sorting,
  searchQuery,
  direction,
}: IFindRecordOptions = {}) {
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
    .then(callRecordsAdapter);
}

export function findById(id: number) {
  return globalThis
    .fetch(`${baseURL}/records/${id}`)
    .then(res => res.json())
    .then(v => v as ICallRecord);
}

export async function remove(id: number) {
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

function callRecordsAdapter(records: unknown): ICallRecord[] {
  if (isArray(records)) {
    return (records.filter(
      isObject
    ) as any) as ICallRecord[] /* .map((val) => ({

    })) */;
  }
  return [];
}
