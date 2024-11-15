import React from 'react';
import './ResultCards.css';

const ResultCards = ({ currentItems, isTransitioning }) => {
  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className={`results-grid ${isTransitioning ? 'fade' : ''}`}>
      {currentItems.map((item, index) => (
        <div 
          key={index} 
          className="result-card" 
          onClick={() => handleCardClick(item.url)}
          style={{ cursor: 'pointer' }}
        >
          <h3>{item.name}</h3>
          <div className="result-details">
            <span>Type: {item.type}</span>
            <span>ABV: {item.abv}</span>
            <span>Distributor: {item.distributor}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultCards;
