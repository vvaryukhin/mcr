import { audioPlayerReducer } from '..';
import { reducerSanityCheck } from 'test-utils';
import { setPlayingRecord } from '../actions';
import fakeRecords from 'features/call-records/fixtures/call-records';

describe('audioPlayerReducer', () => {
  reducerSanityCheck(audioPlayerReducer);

  it('setPlayingRecord', () => {
    const record = fakeRecords[0];
    const actual = { playingRecord: null };
    const expected = { playingRecord: record };
    expect(audioPlayerReducer(actual, setPlayingRecord(record))).toStrictEqual(
      expected
    );
  });
});
