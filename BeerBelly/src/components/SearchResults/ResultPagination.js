import React from 'react';
import './ResultPagination.css';

const ResultPagination = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPageNumbers = () => {
    let pages = [];
    pages.push(1, 2);
    if (totalPages > 4) {
      pages.push('...');
    }
    if (totalPages > 2) {
      pages.push(totalPages - 1, totalPages);
    }

    return pages.map((page, index) => (
      page === '...' ? (
        <span key={index} className="page-ellipsis">...</span>
      ) : (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`page-button ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      )
    ));
  };

  return (
    <div className="pagination">
      <button 
        onClick={() => handlePageChange(1)}
        className="page-button nav-arrow"
        disabled={currentPage === 1}
      >
        ‹‹
      </button>
      <button 
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        className="page-button nav-arrow"
        disabled={currentPage === 1}
      >
        ‹
      </button>
      
      {renderPageNumbers()}

      <button 
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        className="page-button nav-arrow"
        disabled={currentPage === totalPages}
      >
        ›
      </button>
      <button 
        onClick={() => handlePageChange(totalPages)}
        className="page-button nav-arrow"
        disabled={currentPage === totalPages}
      >
        ››
      </button>
    </div>
  );
};

export default ResultPagination;
