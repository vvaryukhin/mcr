import React from 'react';
// import Select from 'components/Select';
import { CallDirectionFilters } from 'features/call-records/types';

import './index.scss';

const callTypeSelectOptions = [
  {
    title: 'все',
    value: CallDirectionFilters.ALL,
  },
  {
    title: 'входящие',
    value: CallDirectionFilters.INCOMING,
  },
  {
    title: 'исходящие',
    value: CallDirectionFilters.OUTCOMING,
  },
];

interface ICallTypeSelectProps {
  direction: CallDirectionFilters;
  setCallDirection: (value: CallDirectionFilters) => void;
}

const CallTypeSelect = ({ direction, setCallDirection }: ICallTypeSelectProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCallDirection(value as CallDirectionFilters);
  };
  return (
    <div className="call-direction">
      {callTypeSelectOptions.map(({ title, value }, key) => {
        return (
          <React.Fragment key={key}>
            <input
              className="call-direction__input"
              onChange={onChange}
              type="radio"
              id={key.toString()}
              value={value}
              checked={direction === value}
              name="call-direction"
            />
            <label className="call-direction__label" htmlFor={key.toString()}>
              {title}
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CallTypeSelect;
