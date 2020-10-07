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
      <div
        style={{
          marginBottom: '20px',
        }}
      >
        <h4 className="heading" style={{ marginBottom: 5 }}>
          From:{' '}
        </h4>
        <input
          style={{
            width: '90%',
            padding: '10px',
            border: '1px solid #dedede',
            borderRadius: 7,
          }}
          type="datetime-local"
          onChange={onFromChange}
          value={from}
        />
      </div>
      <div
        style={{
          marginBottom: '20px',
        }}
      >
        <h4 className="heading" style={{ marginBottom: 5 }}>
          To:{' '}
        </h4>
        <input
          style={{
            width: '90%',
            padding: '10px',
            border: '1px solid #dedede',
            borderRadius: 7,
          }}
          type="datetime-local"
          onChange={onToChange}
          value={to}
        />
      </div>
    </div>
  );
};

export default DateSortingView;
