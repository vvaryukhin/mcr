import React from 'react';
import Select from 'components/Select';
import { CallDirectionTypes } from 'features/call-records/types';

const callTypeSelectOptions = [
  {
    title: 'все',
    value: CallDirectionTypes.ALL,
  },
  {
    title: 'входящие',
    value: CallDirectionTypes.INCOMING,
  },
  {
    title: 'исходящие',
    value: CallDirectionTypes.OUTCOMING,
  },
];

interface ICallTypeSelectProps {
  direction: CallDirectionTypes;
  setCallDirection: (value: CallDirectionTypes) => void;
}

const CallTypeSelect = ({ direction, setCallDirection }: ICallTypeSelectProps) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCallDirection(e.target.value as CallDirectionTypes);
  };
  return (
    <Select value={direction} options={callTypeSelectOptions} onChange={onChange} />
  );
};

export default CallTypeSelect;
