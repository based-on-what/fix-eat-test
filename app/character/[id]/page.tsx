"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
    </div>
  );
};

export default CharacterDetail;
