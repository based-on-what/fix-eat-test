import React from 'react';
import Link from 'next/link';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
  //status: string; // Parámetro adicional como ejemplo
}

const CharacterCard: React.FC<CharacterCardProps> = ({ id, name, image }) => {
  return (
    <Link 
      href={{
        pathname: `/character/${id}`,
        query: { id, name }, 
      }} 
      className={styles.card}
    >
      <div>
        <img src={image} alt={name} />
        <h2>{name}</h2>
      </div>
    </Link>
  );
};

export default CharacterCard;
