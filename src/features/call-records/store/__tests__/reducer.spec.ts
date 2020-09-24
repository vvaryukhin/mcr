import { callRecordsReducer } from '..';
import { reducerSanityCheck } from 'test-utils';
import {
  requestRecords,
  requestRecordsSuccess,
  requestRecordsFail,
  setSearchQuery,
  setSorting,
  setCallDirection,
  setDateInterval,
} from '../actions';
import fakeRecords from 'features/call-records/fixtures/call-records';
import {
  CallRecordsSortingTypes,
  CallDirectionFilters,
} from 'features/call-records/types';

describe('callRecordsReducer', () => {
  reducerSanityCheck(callRecordsReducer);

  it('requestRecords', () => {
    const actual = {} as any;
    const expected = { isLoading: true };

    expect(callRecordsReducer(actual, requestRecords())).toStrictEqual(expected);
  });

  it('requestRecordsSuccess', () => {
    const actual = {} as any;
    const expected = { records: fakeRecords, isLoading: false, isFailed: false };

    expect(
      callRecordsReducer(actual, requestRecordsSuccess(fakeRecords))
    ).toStrictEqual(expected);
  });

  it('requestRecordsFailed', () => {
    const actual = {} as any;
    const expected = { isLoading: false, isFailed: true };

    expect(callRecordsReducer(actual, requestRecordsFail())).toStrictEqual(expected);
  });

  it('setSearchQuery', () => {
    const query = 'asdf';
    const actual = {} as any;
    const expected = { searchQuery: query };

    expect(callRecordsReducer(actual, setSearchQuery(query))).toStrictEqual(
      expected
    );
  });

  it('setSorting', () => {
    const actual = { sorting: CallRecordsSortingTypes.DATE_ACS } as any;
    const expected = { sorting: CallRecordsSortingTypes.DURATION_ACS };

    expect(
      callRecordsReducer(actual, setSorting(CallRecordsSortingTypes.DURATION_ACS))
    ).toStrictEqual(expected);
  });

  it('setDateInterval', () => {
    const actual = {} as any;
    const interval = {
      from: new Date('12/12/2019').getTime(),
      to: Date.now(),
    };
    const expected = {
      dateInterval: { ...interval },
    };

    expect(callRecordsReducer(actual, setDateInterval(interval))).toStrictEqual(
      expected
    );
  });

  it('setCallDirection', () => {
    const actual = { direction: CallDirectionFilters.ALL } as any;
    const expected = { direction: CallDirectionFilters.INCOMING };

    expect(
      callRecordsReducer(actual, setCallDirection(CallDirectionFilters.INCOMING))
    ).toStrictEqual(expected);
  });
});
