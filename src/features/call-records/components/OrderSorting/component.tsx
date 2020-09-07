import React from 'react';
import { CallRecordsSortingTypes } from 'features/call-records/types';
import Select from 'components/Select';

interface IRecordSortingProps {
  selectedSorting: CallRecordsSortingTypes;
  setSorting: (value: CallRecordsSortingTypes) => void;
}

const orderSelectOptions = [
  {
    title: 'по дате (сначало новые)',
    value: CallRecordsSortingTypes.DATE_ACS,
  },
  {
    title: 'по дате (сначало старые)',
    value: CallRecordsSortingTypes.DATE_DES,
  },
  {
    title: 'по времени (по возрастанию)',
    value: CallRecordsSortingTypes.DURATION_ACS,
  },
  { title: 'по времени (по убыванию)', value: CallRecordsSortingTypes.DURATION_DES },
  {
    title: 'по имени собеседника (в алфавитном порядке)',
    value: CallRecordsSortingTypes.NAME_ALPHABET_ACS,
  },
];

const OrderSorting = ({ selectedSorting, setSorting }: IRecordSortingProps) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorting(e.target.value as CallRecordsSortingTypes);
  };

  return (
    <Select
      options={orderSelectOptions}
      onChange={onChange}
      value={selectedSorting}
    />
  );
};

export default OrderSorting;
