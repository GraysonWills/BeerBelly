import React from 'react';
import './BreweryTypeFilter.css';

const breweryTypes = [
  'micro',
  'nano',
  'regional',
  'brewpub',
  'large',
  'bar',
  'contract',
  'proprietor'
];

const BreweryTypeFilter = ({ selectedTypes, setSelectedTypes }) => {
  const toggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };


  return (
    <div className="brewery-type-filter">
      {breweryTypes.map((type) => (
        <button
          key={type}
          className={`brewery-type-button ${selectedTypes.includes(type) ? 'selected' : ''}`}
          onClick={() => toggleType(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default BreweryTypeFilter;