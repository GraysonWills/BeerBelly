import React from 'react';
import '../styles/BreweryTypeFilter.css';

const breweryTypes = [
  'All',
  'micro',
  'nano',
  'regional',
  'brewpub',
  'large',
  'bar',
  'contract',
  'proprietor'
];

const BreweryTypeFilter = ({ selectedType, setSelectedType }) => {
  return (
    <div className="brewery-type-filter">
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {breweryTypes.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreweryTypeFilter;
