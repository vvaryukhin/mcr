import React, { useRef, useState } from 'react';
import Input, { IInputProps } from 'components/Input';
import { hasOwn, isNumber, isString, toInt } from 'utils';

interface IFormFieldProps extends IInputProps {
  value: string;
  errorMessage: ErrorMessage;
  validations: IValidations;
}

interface IValidations {
  email?: boolean;
  phone?: boolean;
  min?: number;
  max?: number;
}

type ErrorMessage =
  | string
  | {
      [K in keyof IValidations]: string;
    };

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

const validations = {
  email(value: string) {
    return emailRegex.test(value);
  },
  phone(value: string) {
    return value.replace(/\D/g, '').length === 11;
  },
  min(value: string, min: number) {
    const intValue = toInt(value);
    if (intValue !== -1) {
      return intValue >= min;
    }
    return value.length >= min;
  },
  max(value: string, max: number) {
    const intValue = toInt(value);
    if (intValue !== -1) {
      return intValue <= max;
    }
    return value.length <= max;
  },
};

const getError = (errors: ErrorMessage, key: string) => {
  return isString(errors) ? errors : (hasOwn(errors, key) && errors[key]) || 'error';
};

function withError(value: boolean, errors: ErrorMessage, key: string) {
  return value ? ([value] as const) : ([value, getError(errors, key)] as const);
}

function validate(
  value: string,
  { email, phone, min, max }: IValidations,
  errors: ErrorMessage
) {
  if (email) {
    return withError(validations.email(value), errors, 'email');
  }
  if (phone) {
    return withError(validations.phone(value), errors, 'phone');
  }
  if (isNumber(min)) {
    return withError(validations.min(value, min), errors, 'min');
  }
  if (isNumber(max)) {
    return withError(validations.max(value, max), errors, 'max');
  }
  return [true] as const;
}

const FormField = ({
  value,
  onChange: onChange_,
  validations,
  errorMessage,
  ...rest
}: IFormFieldProps) => {
  const [error, setError] = useState<string>();
  const isDirty = useRef(false);

  const validateInput = (value: string) => {
    const [isValid, errMsg] = validate(value, validations, errorMessage);
    if (isValid && error) {
      setError(undefined);
    } else {
      setError(errMsg);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isDirty.current && validateInput(value);
    onChange_ && onChange_(e);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isDirty.current) {
      validateInput(e.target.value);
    }
    isDirty.current = true;
  };

  return (
    <div>
      <Input value={value} onBlur={onBlur} onChange={onChange} {...rest} />
      <div
        style={{
          color: 'red',
          margin: '5px 20px 10px',
          height: 14,
          textAlign: 'left',
        }}
      >
        {error}
      </div>
    </div>
  );
};

export default FormField;
