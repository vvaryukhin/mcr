import React from 'react';
import CallRecordsList from '../component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { noop } from 'utils';
import fakeRecords from '../../../fixtures/call-records';
import { renderWithRouter } from 'test-utils';

describe('CallRecordsList', () => {
  it('should show loader when isLoading props is true', () => {
    let props = {
      records: [],
      setPlayingRecord: noop,
      deleteRecord: noop,
      isFailed: false,
      isLoading: false,
    };
    const { rerender } = render(<CallRecordsList {...props} />);
    expect(screen.queryByTestId('call-records-list/loader')).toBeNull();
    props = { ...props, isLoading: true };
    rerender(<CallRecordsList {...props} />);
    expect(screen.queryByTestId('call-records-list/loader')).toBeDefined();
  });

  it('should show error when isFailed props is true', () => {
    let props = {
      records: [],
      setPlayingRecord: noop,
      deleteRecord: noop,
      isFailed: false,
      isLoading: false,
    };
    const { rerender } = render(<CallRecordsList {...props} />);
    expect(screen.queryByTestId('call-records-list/error')).toBeNull();
    props = { ...props, isFailed: true };
    rerender(<CallRecordsList {...props} />);
    expect(screen.queryByTestId('call-records-list/error')).toBeDefined();
  });

  it('should call setPlayingRecord when user clicks on item', () => {
    const testRecord = fakeRecords[0];
    const props = {
      records: [testRecord],
      setPlayingRecord: jest.fn(),
      deleteRecord: noop,
      isFailed: false,
      isLoading: false,
    };
    renderWithRouter(<CallRecordsList {...props} />);
    const item = screen.getByTestId('call-records-list/item');
    userEvent.click(item);
    expect(props.setPlayingRecord).toBeCalledTimes(1);
    expect(props.setPlayingRecord).toBeCalledWith(testRecord);
  });

  it('should call deleteRecord when user clicks on deleteButton', () => {
    const testRecord = fakeRecords[0];
    const props = {
      records: [testRecord],
      setPlayingRecord: jest.fn(),
      deleteRecord: jest.fn(),
      isFailed: false,
      isLoading: false,
    };
    renderWithRouter(<CallRecordsList {...props} />);
    const item = screen.getByTestId('call-records-list/item/delete');
    userEvent.click(item);
    expect(props.deleteRecord).toBeCalledTimes(1);
    expect(props.deleteRecord).toBeCalledWith(testRecord.id);
    expect(props.setPlayingRecord).not.toBeCalled();
  });
});
