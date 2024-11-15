import React, { useState } from 'react';
import './TypeFilters.css';

const typeOptions = {
  Beer: ['IPA', 'Wheat', 'Stout', 'Pale Ale', 'Porter', 'Pilsner', 'Lager'],
  Wine: ['Red', 'White', 'Rosé', 'Sparkling', 'Dessert', 'Fortified'],
  Liquor: ['Whiskey', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Brandy']
};

const TypeFilters = ({ selectedCategory, onTypeSelect, onPremiumClick }) => {
  return (
    <div className="type-filters">
      <h3 className="filter-title">Filter by Type</h3>
      <div className="filter-buttons">
        {typeOptions[selectedCategory]?.map(type => (
          <button
            key={type}
            className="type-button"
            onClick={onPremiumClick}
          >
            <div className="button-content">
              <span>{type}</span>
              <span className="lock-icon">🔒</span>
            </div>
          </button>
        ))}
      </div>
      <div className="premium-lock">
        🔒 Premium Feature
      </div>
    </div>
  );
};export default TypeFilters;