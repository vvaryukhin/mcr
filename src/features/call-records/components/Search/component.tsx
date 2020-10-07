import React from 'react';

import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import './index.scss';

interface ISearchProps {
  query: string;
  setSearchQuery: (value: string) => void;
}

const Search = ({ setSearchQuery }: ISearchProps) => {
  return (
    <div className="search">
      <SearchIcon className="search__icon" />
      <input
        className="search__input"
        type="text"
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
