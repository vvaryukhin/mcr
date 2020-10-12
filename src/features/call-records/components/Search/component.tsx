import React, { useState } from 'react';
import Input from 'components/Input';

import { ReactComponent as SearchIcon } from 'assets/images/search.svg';

interface ISearchProps {
  query: string;
  setSearchQuery: (value: string) => void;
}

const Search = ({ query, setSearchQuery }: ISearchProps) => {
  const [value, setValue] = useState(query);

  return (
    <Input
      value={value}
      onChange={e => {
        const { value: newValue } = e.target;
        setValue(newValue);
        setSearchQuery(newValue);
      }}
      leftIcon={SearchIcon}
      placeholder="Search"
    />
  );
};

export default Search;
