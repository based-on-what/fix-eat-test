import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  const [showInput, setShowInput] = useState(false);
  const [pageNumber, setPageNumber] = useState<number | string>('');

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 1 && Number(value) <= 42)) {
      setPageNumber(value);
    }
  };

  const handlePageSubmit = () => {
    if (pageNumber !== '' && Number(pageNumber) >= 1 && Number(pageNumber) <= 42) {
      onPageChange({ selected: Number(pageNumber) - 1 });
      setShowInput(false);
      setPageNumber('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageSubmit();
    }
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={
          <span
            className={styles.breakLabel}
            onMouseEnter={() => setShowInput(true)}
            onMouseLeave={() => setShowInput(false)}
          >
            ...
          </span>
        }
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
      {showInput && (
        <div className={styles.pageInputContainer}>
          <input
            type="number"
            value={pageNumber}
            onChange={handlePageInput}
            onKeyPress={handleKeyPress}
            className={styles.pageInput}
            min="1"
            max="42"
            placeholder="Page #"
          />
          <button onClick={handlePageSubmit} className={styles.pageButton}>Go</button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
