import React, { useState } from 'react';
import './NavFilters.css';

const NavFilters = ({ selected, onSelect, onPremiumClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const options = [
    { name: 'Beer', locked: false },
    { name: 'Liquor', locked: true },
    { name: 'Wine', locked: true }
  ];

  const handleClick = (option) => {
    if (option.locked) {
      onPremiumClick();
    } else {
      onSelect(option.name);
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="dropdown-container">
      <div 
        className="dropdown-header"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selected}
        <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
      </div>
      <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
        {options.map((option) => (
          <div
            key={option.name}
            className={`dropdown-item ${selected === option.name ? 'selected' : ''} ${option.locked ? 'locked' : ''}`}
            onClick={() => handleClick(option)}
          >
            {option.name} {option.locked && '🔒'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavFilters;