import toRange from '../to-range';
import { functionSanityCheck } from 'test-utils';

describe('toRange', () => {
  functionSanityCheck(toRange);

  it('should return passed number if it is in a range', () => {
    const value = 10;
    const actual = toRange(value, [0, 50]);
    expect(actual).toBe(10);
  });

  it('should return a min range value if passed number is smaller', () => {
    const value = -10;
    const actual = toRange(value, [0, 50]);
    expect(actual).toBe(0);
  });

  it('should return a max range value if passed number is smaller', () => {
    const value = 1000;
    const actual = toRange(value, [0, 50]);
    expect(actual).toBe(50);
  });
});
