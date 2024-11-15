import React, { useState } from 'react';
import './ResultPagination.css';

const ResultPagination = ({ currentPage, totalPages, handlePageChange }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(inputValue);
    if (pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange(pageNum);
      setShowInput(false);
      setInputValue('');
    }
  };

  const renderPageNumbers = () => {
    let pages = [];
    if (totalPages >= 1) {
        pages.push(1);
      }
      
      // Add second page only if we have enough content
    //   if (totalPages >= 2) {
    //     pages.push(2);
    //   }
    
    if (totalPages > 4) {
      if (currentPage >= 2 && currentPage <= totalPages - 1) {
        pages.push(
          '...',
          <button 
            key="input" 
            className="page-button active tooltip-container" 
            onClick={() => setShowInput(true)}
          >
            {showInput ? (
              <form onSubmit={handleInputSubmit}>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="page-input"
                  autoFocus
                  onBlur={() => setShowInput(false)}
                />
              </form>
            ) : (
              <>
                {currentPage}
                <span className="tooltip">Click to enter page number</span>
              </>
            )}
          </button>,
          '...'
        );
      } else {
        pages.push(
            <span 
            key="input" 
            className="page-ellipsis tooltip-container" 
            onClick={() => setShowInput(true)}
            style={{ cursor: 'pointer' }}
            >
            {showInput ? (
                <form onSubmit={handleInputSubmit}>
                <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="page-input"
                    autoFocus
                    onBlur={() => setShowInput(false)}
                />
                </form>
            ) : (
                <>
                ...
                <span className="tooltip">Click to enter page number</span>
                </>
            )}
            </span>
        );
      }
    }
    
    if (totalPages > 2) {
      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      typeof page === 'object' ? page : (
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
