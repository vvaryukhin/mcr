import React from 'react';
import ProgressBar from '..';
import { render, screen, fireEvent } from '@testing-library/react';
import { noop } from 'utils';

describe('ProgressBar', () => {
  it('should update progress bar on props change', () => {
    let props = {
      currentPercent: 0,
      onUpdate: noop,
    };

    const { rerender } = render(<ProgressBar {...props} />);
    const progressLine = screen.getByTestId('progress-bar/progress-line');

    expect(progressLine).toHaveStyle('width: 0%');

    props = { ...props, currentPercent: 50 };
    rerender(<ProgressBar {...props} />);

    expect(progressLine).toHaveStyle('width: 50%');
  });

  it("shouldn't update progress bar if user started touching", () => {
    let props = {
      currentPercent: 0,
      onUpdate: noop,
    };

    const { rerender } = render(<ProgressBar {...props} />);
    const progressBar = screen.getByTestId('progress-bar');
    const progressLine = screen.getByTestId('progress-bar/progress-line');

    expect(progressLine).toHaveStyle('width: 0%');

    fireEvent.touchStart(progressBar, { touches: [{ clientX: 123 }] });
    props = { ...props, currentPercent: 50 };
    rerender(<ProgressBar {...props} />);

    expect(progressLine).not.toHaveStyle('width: 50%');

    fireEvent.touchEnd(progressBar);
    props = { ...props, currentPercent: 51 };
    rerender(<ProgressBar {...props} />);

    expect(progressLine).toHaveStyle('width: 51%');
  });

  it('should call onUpdate with new percent after progress bar drag', () => {
    const props = {
      currentPercent: 0,
      onUpdate: jest.fn(),
    };

    render(<ProgressBar {...props} />);
    const progressBar = screen.getByTestId('progress-bar');

    fireEvent.touchStart(progressBar, { touches: [{ clientX: 123 }] });
    fireEvent.touchEnd(progressBar);

    expect(props.onUpdate).toBeCalledTimes(1);
    expect(props.onUpdate).toBeCalledWith(expect.any(Number));
  });

  it.todo("shouldn't allow progress line to move outside");
});
