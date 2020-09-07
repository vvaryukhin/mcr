import secondsToTime from 'features/audio-player/utils/seconds-to-time';
import { functionSanityCheck } from 'test-utils';

describe('secondsToTime', () => {
  functionSanityCheck(secondsToTime);

  it('should convert to time correctly', () => {
    expect(secondsToTime(121)).toBe('02:01');
    expect(secondsToTime(250)).toBe('04:10');
  });

  it('should add hours if needed', () => {
    expect(secondsToTime(7278)).toBe('02:01:18');
  });
});
