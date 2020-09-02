import { makeAction, IActionUnion } from 'store/utils';
import { CallRecordEvents } from './events';
import { ICallRecord } from '../types';

export const setRecords = makeAction<CallRecordEvents.SET_RECORDS, ICallRecord[]>(
  CallRecordEvents.SET_RECORDS
);

const actions = {
  setRecords,
};

export type ICallRecordAction = IActionUnion<typeof actions>;

export default actions;
