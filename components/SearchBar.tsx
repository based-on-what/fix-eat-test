import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      placeholder="Search characters..."
      className={styles.searchInput}
    />
  );
};

export default SearchBar;
