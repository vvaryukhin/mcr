import React, { useEffect, useState } from 'react';
import Input, { IInputProps } from 'components/Input';
import { id, isString, makeSet } from 'utils';

interface IPhoneMaskProps extends Omit<IInputProps, 'onChange' | 'type'> {
  onChange?: (phone: string) => void;
}

const firstPhoneNumberDigits = makeSet(['+', '7', '8']);

// country code - 1
// area code - 3
// central office code - 3
// line/subscription number - 4
const MAX_DIGITS_IN_NUMBER = 11;

const onlyDigits = (val: string) => val.replace(/\D/g, '');

const formatNumber = (number: string) => {
  const result = [
    /* country code (+7) */ number.substring(0, 1),
    /* area code */ number.substring(1, 4),
    /* central office code */ number.substring(4, 7),
    /* line/subscription number */ number.substring(7, 11),
  ]
    .filter(id)
    .join(' ');
  return result.length > 0 ? `+${result}` : result;
};

const PhoneMask = ({ value = '', onChange, ...otherProps }: IPhoneMaskProps) => {
  const [digitsValue, setDigitsValue] = useState(value);

  useEffect(() => {
    setDigitsValue(onlyDigits(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneDigits = onlyDigits(e.target.value);
    let shouldUpdate = true;
    let newValue: string | null = null;
    if (digitsValue === '' && newPhoneDigits.length <= 1) {
      if (firstPhoneNumberDigits.has(newPhoneDigits)) {
        newValue = '+7';
      } else {
        newValue = '+7' + newPhoneDigits;
      }
    } else if (newPhoneDigits.length > MAX_DIGITS_IN_NUMBER) {
      shouldUpdate = false;
    } else {
      newValue = newPhoneDigits;
    }
    if (shouldUpdate && isString(newValue)) {
      newValue = newValue.substr(0, MAX_DIGITS_IN_NUMBER);
      setDigitsValue(newValue);
      onChange && onChange(newValue);
    }
  };

  return (
    <Input
      value={formatNumber(digitsValue)}
      onChange={handleChange}
      {...otherProps}
    />
  );
};

export default PhoneMask;
