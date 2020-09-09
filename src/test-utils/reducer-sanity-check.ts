import { functionSanityCheck } from 'test-utils';

const UNMATCHED_ACTION = { type: 'UNMATCHED_ACTION', payload: null };

export default function reducerSanityCheck(reducer: any) {
  functionSanityCheck(reducer);

  it('returns the same state as passed in if no action matches', () => {
    const expected = { foo: 1 };
    const actual = reducer({ foo: 1 }, UNMATCHED_ACTION);
    expect(expected).toEqual(actual);
  });

  it('returns a initial state if none is passed in', () => {
    const actual = reducer(undefined, UNMATCHED_ACTION);
    expect(actual).toBeDefined();
    expect(typeof actual).toBe('object');
    expect(actual).not.toBe(null);
    expect(actual).not.toBe(undefined);
    expect(Array.isArray(actual)).toBe(false);
  });
}
