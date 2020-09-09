import { callRecordsReducer } from '..';
import { reducerSanityCheck } from 'test-utils';

describe('callRecordsReducer', () => {
  reducerSanityCheck(callRecordsReducer);
});
