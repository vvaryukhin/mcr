import React from 'react';
import Variant from 'components/Variant';
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
  return (
    <Variant
      selectedValue={direction}
      onChange={value => setCallDirection(value as CallDirectionFilters)}
      variants={callTypeSelectOptions}
      name="call-direction"
    />
  );
};

export default CallTypeSelect;
