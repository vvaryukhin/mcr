import React from 'react';

import './index.scss';

interface IVariantProps {
  variants: IVariant[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

interface IVariant {
  title: string;
  value: string;
}

const Variant = ({ variants, selectedValue, name, onChange }: IVariantProps) => {
  return (
    <div className="variant">
      {variants.map(({ title, value }, key) => {
        const strKey = key.toString();
        return (
          <React.Fragment key={key}>
            <input
              id={strKey}
              className="variant__input"
              type="radio"
              value={value}
              onChange={e => onChange(e.target.value)}
              checked={selectedValue === value}
              name={name}
            />
            <label className="variant__label" htmlFor={strKey}>
              {title}
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Variant;
