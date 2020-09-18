import React from 'react';

interface ISearchProps {
  query: string;
  setSearchQuery: (value: string) => void;
}

const Search = ({ setSearchQuery }: ISearchProps) => {
  return (
    <div style={{ margin: '20px 0' }}>
      <input
        type="text"
        onChange={e => setSearchQuery(e.target.value)}
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
