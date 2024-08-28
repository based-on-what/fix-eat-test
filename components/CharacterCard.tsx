import React from 'react';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ id, name, image }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
    </div>
  );
};

export default CharacterCard;
