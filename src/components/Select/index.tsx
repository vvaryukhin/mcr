import React from 'react';

interface ISelectProps {
  value: string | number;
  options: ISelectOption[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

interface ISelectOption {
  title: string;
  value: string | number;
}

const Select = ({ value, options, onChange }: ISelectProps) => {
  return (
    <select onChange={onChange} style={{ width: '100%' }} value={value}>
      {options.map(({ title, value }) => {
        return (
          <option key={`option-${value}`} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
