import React, { useState } from 'react';
import Input from 'components/Input';
import Filters from '../Filters';

import { ReactComponent as SearchIcon } from 'assets/images/search.svg';

interface ISearchProps {
  query: string;
  setSearchQuery: (value: string) => void;
}

const Search = ({ query, setSearchQuery }: ISearchProps) => {
  const [value, setValue] = useState(query);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Input
        value={value}
        onChange={e => {
          const { value: newValue } = e.target;
          setValue(newValue);
          setSearchQuery(newValue);
        }}
        leftIcon={SearchIcon}
        placeholder="Search"
        fullWidth
      />
      <Filters />
    </div>
  );
};

export default Search;
