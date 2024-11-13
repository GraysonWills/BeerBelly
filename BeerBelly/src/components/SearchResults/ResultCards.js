import React from 'react';
import './ResultCards.css';

const ResultCards = ({ currentItems, isTransitioning }) => {
  return (
    <div className={`results-grid ${isTransitioning ? 'fade' : ''}`}>
      {currentItems.map((item, index) => (
        <div key={index} className="result-card">
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
