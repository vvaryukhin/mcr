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
  return (
    <>
      <h4 className="heading" style={{ marginBottom: 5 }}>
        Sorting
      </h4>
      <Select
        options={orderSelectOptions}
        onChange={e => setSorting(e.target.value as CallRecordsSortingTypes)}
        value={selectedSorting}
        style={{
          width: '90%',
          margin: 'auto',
        }}
      />
    </>
  );
};

export default OrderSorting;
