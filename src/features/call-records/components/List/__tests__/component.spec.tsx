import React from 'react';
import CallRecordsList from '../component';
import { functionSanityCheck } from 'test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { noop } from 'utils';
import fakeRecords from './fixtures/call-records';
import { BrowserRouter } from 'react-router-dom';

describe('CallRecordsList', () => {
  functionSanityCheck(CallRecordsList);

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
    render(
      <BrowserRouter>
        <CallRecordsList {...props} />
      </BrowserRouter>
    );
    const item = screen.getByTestId('call-records-list/item');
    userEvent.click(item);
    expect(props.setPlayingRecord).toBeCalledTimes(1);
    expect(props.setPlayingRecord).toBeCalledWith(testRecord);
  });

  it.todo('should call deleteRecord when user clicks on deleteButton');
});
