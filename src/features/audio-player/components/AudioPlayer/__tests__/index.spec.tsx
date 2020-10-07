import React from 'react';
import { AudioPlayer } from '..';
import { render, screen } from '@testing-library/react';
import fakeRecords from 'features/call-records/fixtures/call-records';
import userEvent from '@testing-library/user-event';
import mockHTMLMediaElement from '__mocks__/html-media-element';

describe('BottomControls', () => {
  beforeEach(() => {
    mockHTMLMediaElement();
  });

  it('hides player if playing record is null', () => {
    const record = null;

    const { rerender } = render(<AudioPlayer playingRecord={record} />);

    expect(screen.queryByTestId('audio-player')).not.toBeInTheDocument();

    rerender(<AudioPlayer playingRecord={fakeRecords[0]} />);

    expect(screen.queryByTestId('audio-player')).toBeInTheDocument();
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

  it('should update duration when clicking on forward/backward buttons', () => {
    const record = fakeRecords[0];

    render(<AudioPlayer playingRecord={record} />);

    const backwardBtn = screen.getByTestId('audio-player/backward');
    const forwardBtn = screen.getByTestId('audio-player/forward');
    const currentTime = screen.getByTestId('audio-player/current-time');

    userEvent.click(forwardBtn);

    expect(currentTime).toHaveTextContent('00:10');

    userEvent.click(backwardBtn);

    expect(currentTime).toHaveTextContent('00:00');
  });
});
