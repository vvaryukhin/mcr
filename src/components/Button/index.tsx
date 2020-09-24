import React from 'react';

import './index.scss';

const Button: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ children, ...props }) => {
  return (
    <button {...props} className="button">
      {children}
    </button>
  );
};

export default Button;
