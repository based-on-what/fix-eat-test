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
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const charactersPerPage = 20; // Número de personajes por página

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

      setAllCharacters(allCharacters);
      setFilteredCharacters(allCharacters); // Inicialmente, sin filtros
    };

    fetchAllCharacters();
  }, []);

  useEffect(() => {
    const results = allCharacters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(results);
    setCurrentPage(1); // Reinicia la página a 1 al buscar
  }, [searchTerm, allCharacters]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };

  // Calcular los personajes a mostrar en la página actual
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  return (
    <div className={styles.container}>
      <h1>Rick and Morty Characters</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.grid}>
        {currentCharacters.map((character) => (
          <CharacterCard key={character.id} id={character.id} name={character.name} image={character.image} status={character.status} />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination pageCount={Math.ceil(filteredCharacters.length / charactersPerPage)} onPageChange={handlePageClick} />
      </div>
    </div>
  );
};

export default Home;
