import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  const [pageNumber, setPageNumber] = useState<number | string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 1 && Number(value) <= 42)) {
      setPageNumber(value);
    } else {
      alert('Page number must be between 1 and 42');
    }
  };

  const handlePageSubmit = () => {
    if (pageNumber !== '' && Number(pageNumber) >= 1 && Number(pageNumber) <= 42) {
      const selectedPage = Number(pageNumber) - 1;
      onPageChange({ selected: selectedPage });
      setCurrentPage(selectedPage);
      setPageNumber('');
    }
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(data) => {
          setCurrentPage(data.selected);
          onPageChange(data);
        }}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
      <div className={styles.pageInputContainer}>
        <input
          type="number"
          value={pageNumber}
          onChange={handlePageInput}
          className={styles.pageInput}
          min="1"
          max="42"
          placeholder="Page #"
        />
        <button onClick={handlePageSubmit} className={styles.pageButton}>
          Go
        </button>
      </div>
    </div>
  );
};

export default Pagination;
