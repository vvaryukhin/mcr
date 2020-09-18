import React from 'react';

interface IDateSortingViewProps {
  to: string;
  from: string;
  onFromChange: React.ChangeEventHandler<HTMLInputElement>;
  onToChange: React.ChangeEventHandler<HTMLInputElement>;
}

const DateSortingView = ({
  to,
  from,
  onFromChange,
  onToChange,
}: IDateSortingViewProps) => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        From: <input type="date" onChange={onFromChange} value={from} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        To: <input type="date" onChange={onToChange} value={to} />
      </div>
    </div>
  );
};

export default DateSortingView;
