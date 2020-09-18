import React from 'react';
import { AudioPlayer } from '..';
import { render, screen } from '@testing-library/react';
import fakeRecords from 'features/call-records/fixtures/call-records';
import userEvent from '@testing-library/user-event';
import { noop } from 'utils';

describe('BottomControls', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.load = noop;
    window.HTMLMediaElement.prototype.play = noop as any;
    window.HTMLMediaElement.prototype.pause = noop;
  });

  it('hides player if playing record is null', () => {
    const record = null;

    const { rerender } = render(<AudioPlayer playingRecord={record} />);
    const player = screen.getByTestId('audio-player');

    expect(player).toHaveStyle({ display: 'none' });

    rerender(<AudioPlayer playingRecord={fakeRecords[0]} />);

    expect(player).not.toHaveStyle({ display: 'none' });
  });

  it('should show/hide play and pause buttons', () => {
    const record = fakeRecords[0];

    render(<AudioPlayer playingRecord={record} />);

    expect(screen.queryByTestId('audio-player/play')).toBeInTheDocument();
    expect(screen.queryByTestId('audio-player/pause')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('audio-player/play'));

    expect(screen.queryByTestId('audio-player/play')).not.toBeInTheDocument();
    expect(screen.queryByTestId('audio-player/pause')).toBeInTheDocument();
  });
});
