// src/Components/Pagination.jsx
import React, { useState, useEffect } from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageLimit = 4;
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    const newStart = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
    setStartPage(newStart);
  }, [currentPage]);

  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <button
        className="page-btn"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        ⏮ First
      </button>

      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage - 4)}
        disabled={currentPage - 3 <= 1}
      >
        ◀ Prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`page-btn ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage + 4)}
        disabled={currentPage + 4 > totalPages}
      >
        Next ▶
      </button>

    </div>
  );
};

export default Pagination;
