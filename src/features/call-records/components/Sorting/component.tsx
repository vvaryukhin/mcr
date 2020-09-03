import React from 'react';
import { CallRecordsSortingTypes } from 'features/call-records/types';
import { toInt } from 'utils';

interface IRecordSortingProps {
  selectedSorting: CallRecordsSortingTypes;
  setSorting: (value: CallRecordsSortingTypes) => void;
}

const RecordsSorting = ({ selectedSorting, setSorting }: IRecordSortingProps) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sorting = toInt(e.target.value);
    setSorting(sorting);
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <select onChange={onChange} style={{ width: '100%' }} value={selectedSorting}>
        <option value={CallRecordsSortingTypes.DATE_ACS}>
          по дате (сначало новые)
        </option>
        <option value={CallRecordsSortingTypes.DATE_DES}>
          по дате (сначало старые)
        </option>
        <option value={CallRecordsSortingTypes.DURATION_ACS}>
          по времени (по возрастанию)
        </option>
        <option value={CallRecordsSortingTypes.DURATION_DES}>
          по времени (по убыванию)
        </option>
        <option value={CallRecordsSortingTypes.NAME_ALPHABET_ACS}>
          по имени собеседника (в алфавитном порядке)
        </option>
      </select>
    </div>
  );
};

export default RecordsSorting;
