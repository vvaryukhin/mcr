import React from 'react';
import { classNames } from 'utils';

import './index.scss';

interface ISelectProps {
  value: string | number;
  options: ISelectOption[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  hasArrow?: boolean;
  hasBorder?: boolean;
  isLight?: boolean;
  [extraProps: string]: any;
}

interface ISelectOption {
  title: string;
  value: string | number;
}

const Select = ({
  value,
  options,
  onChange,
  hasArrow = true,
  hasBorder = true,
  isLight = false,
  ...props
}: ISelectProps) => {
  return (
    <div
      className={`select ${classNames({
        'select--light': isLight,
        'select--noArrow': !hasArrow,
        'select--noBorder': !hasBorder,
      })}`}
      {...props}
    >
      <select className="select__select" onChange={onChange} value={value}>
        {options.map(({ title, value }) => {
          return (
            <option key={`option-${value}`} value={value}>
              {title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
