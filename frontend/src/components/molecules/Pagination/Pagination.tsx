// src/components/Pagination/Pagination.tsx
import { memo, useMemo } from "react";
import styles from "./Pagination.module.scss";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = memo(({ currentPage, totalPages, onPageChange }: Props) => {
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    startPage = Math.max(1, endPage - maxVisiblePages + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <nav className={styles.paginationContainer}>
      <button
        className={styles.navButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      <ul className={styles.pageList}>
        {pageNumbers[0] > 1 && (
          <>
            <li>
              <button
                className={styles.pageButton}
                onClick={() => onPageChange(1)}
              >
                1
              </button>
            </li>
            <li className={styles.ellipsis}>...</li>
          </>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`${styles.pageButton} ${
                currentPage === number ? styles.active : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            <li className={styles.ellipsis}>...</li>
            <li>
              <button
                className={styles.pageButton}
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
      </ul>

      {/* <span className={styles.pageInfo}>
        {currentPage} / {totalPages}
      </span> */}

      <button
        className={styles.navButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
});

Pagination.displayName = "Pagination";
export default Pagination;
