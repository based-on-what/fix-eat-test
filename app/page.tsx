"use client";

import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import styles from './page.module.css'; 

interface Character {
  id: number;
  name: string;
  image: string;
}

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async (page: number) => {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&limit=14`);
      const data = await res.json();
      setCharacters(data.results);
      setPageCount(data.info.pages);
    };

    fetchCharacters(currentPage);
  }, [currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <div className={styles.grid}>
        {characters.map((character) => (
          <div key={character.id} className={styles.card}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
          </div>
        ))}
      </div>
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </div>
  );
};

export default Home;
