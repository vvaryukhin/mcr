import React from 'react';
import { IDateInterval } from 'features/call-records/types';
import { isNaN } from 'utils';
import DateSortingView from './component';
import { timestampToDateString } from 'features/call-records/utils';

interface IDateSortingProps {
  value: IDateInterval;
  onChange: (payload: IDateInterval) => void;
}

const DateSorting = ({ value, onChange }: IDateSortingProps) => {
  const onFromChange = makeOnChange(timestamp =>
    onChange({ ...value, from: timestamp })
  );
  const onToChange = makeOnChange(timestamp =>
    onChange({ ...value, to: timestamp })
  );

  return (
    <DateSortingView
      to={timestampToDateString(value.to)}
      from={timestampToDateString(value.from)}
      onToChange={onToChange}
      onFromChange={onFromChange}
    />
  );
};

function makeOnChange(cb: (value: number) => void) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const timestamp = new Date(e.target.value).getTime();
    if (!isNaN(timestamp)) {
      cb(timestamp);
    }
  };
}

export default DateSorting;
