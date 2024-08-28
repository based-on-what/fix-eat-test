"use client";

import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import styles from './page.module.css'; 

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCharacters = async (page: number) => {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&limit=20`);
      const data = await res.json();
      setCharacters(data.results);
      setPageCount(data.info.pages);
    };

    fetchCharacters(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      let allCharacters: Character[] = [];
      let page = 1;
      let totalPages = 1;

      while (page <= totalPages) {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await res.json();
        allCharacters = [...allCharacters, ...data.results];
        totalPages = data.info.pages;
        page++;
      }

      const results = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(results);
    };

    if (searchTerm) {
      fetchAllCharacters();
    } else {
      setFilteredCharacters(characters);
    }
  }, [characters, searchTerm]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div className={styles.container}>
      <h1>Rick and Morty Characters</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.grid}>
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id} id={character.id} name={character.name} image={character.image} status={character.status} />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </div>
  );
};

export default Home;
