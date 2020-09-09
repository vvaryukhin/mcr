import { audioPlayerReducer } from '..';
import { reducerSanityCheck } from 'test-utils';

describe('audioPlayerReducer', () => {
  reducerSanityCheck(audioPlayerReducer);
});
