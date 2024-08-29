"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // Importa useRouter desde next/navigation
import styles from './CharacterDetail.module.css';

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
}

const CharacterDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [character, setCharacter] = useState<Character | null>(null);
  const router = useRouter(); // Usa useRouter de next/navigation

  useEffect(() => {
    if (id) {
      const fetchCharacter = async () => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await res.json();
        setCharacter(data);
      };

      fetchCharacter();
    } else {
      console.log(searchParams);
      console.log(id);
    }
  }, [id]);

  if (!character) {
    return <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
              
            </div>
          </div>
  
  }

  return (
    <div className={styles.container}>
      <img src={character.image} alt={character.name} className={styles.image} />
      <div className={styles.details}>
        <h1>Name: {character.name}</h1>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Origin: {character.origin.name}</p>
      </div>
      <button className={styles.button} onClick={() => router.push('/')}>
        Go to Home
      </button>
    </div>
  );
};

export default CharacterDetail;
