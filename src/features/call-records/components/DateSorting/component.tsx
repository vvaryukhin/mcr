import React, { useReducer } from 'react';
import { IDateInterval } from 'features/call-records/types';
import { useLazyEffect } from 'hooks';

enum DateIntervalActions {
  SET_FROM,
  SET_TO,
}

const dateIntervalReducer = (
  state: IDateInterval,
  action: { type: DateIntervalActions; payload: number }
) => {
  switch (action.type) {
    case DateIntervalActions.SET_FROM:
      return { ...state, from: action.payload };
    case DateIntervalActions.SET_TO:
      return { ...state, to: action.payload };
    default:
      return state;
  }
};

interface IDateSortingProps {
  dateInterval: IDateInterval;
  setDateInterval: (payload: IDateInterval) => void;
}

const DateSorting = ({ dateInterval, setDateInterval }: IDateSortingProps) => {
  const [interval, dispatch] = useReducer(dateIntervalReducer, { ...dateInterval });

  useLazyEffect(() => {
    setDateInterval(interval);
  }, [interval, setDateInterval]);

  const onFromChange = makeOnChange(DateIntervalActions.SET_FROM, dispatch);
  const onToChange = makeOnChange(DateIntervalActions.SET_TO, dispatch);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        From: <input type="date" onChange={onFromChange} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        To:{' '}
        <input
          type="date"
          onChange={onToChange}
          /* {...(interval.from
            ? { min: dateToInputFormat(new Date(interval.from)) }
            : {})} */
        />
      </div>
    </div>
  );
};

/* function dateToInputFormat(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}-${toDateNumber(month)}-${day}`;
}

function toDateNumber(num: number) {
  return num < 10 ? `0${num}` : num.toString();
} */

function makeOnChange<T extends DateIntervalActions>(
  type: T,
  dispatch: (action: { type: T; payload: number }) => void
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const timestamp = new Date(e.target.value).getTime();
    if (!isNaN(timestamp)) {
      dispatch({ type, payload: timestamp });
    }
  };
}

export default DateSorting;
