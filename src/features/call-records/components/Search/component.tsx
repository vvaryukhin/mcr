import React, { useState } from 'react';

interface ISearchProps {
  query: string;
  searchByQuery: (value: string) => void;
}

const Search = ({ query, searchByQuery }: ISearchProps) => {
  const [value, setValue] = useState(query);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    searchByQuery(newValue);
  };
  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        value={value}
        style={{
          boxSizing: 'border-box',
          padding: 5,
          border: '1px solid #888',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default Search;
