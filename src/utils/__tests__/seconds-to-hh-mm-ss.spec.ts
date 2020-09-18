import secondsToHHMMSS from 'utils/seconds-to-hh-mm-ss';

describe('secondsToHHMMSS', () => {
  it('should convert to time correctly', () => {
    expect(secondsToHHMMSS(121)).toBe('02:01');
    expect(secondsToHHMMSS(250)).toBe('04:10');
  });

  it('should add hours if needed', () => {
    expect(secondsToHHMMSS(7278)).toBe('02:01:18');
  });
});
