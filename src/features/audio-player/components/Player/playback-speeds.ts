export const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export const PLAYBACK_SPEEDS_SELECT_OPTIONS = PLAYBACK_SPEEDS.map(v => ({
  title: v + 'x',
  value: v,
}));
