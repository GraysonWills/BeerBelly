import React, { useState } from 'react';
import NavFilters from './NavFilters';
import TypeFilters from './TypeFilters';
import ABVSlider from './ABVSlider';
import './SideNav.css';
  const SideNav = ({ selected, onSelect, onPremiumClick, onTypeSelect, onAbvChange}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleTypeSelect = (types) => {
      onTypeSelect(types);

      };

    const handleAbvChange = (range) => {
      onAbvChange(range);
    };

    return (
    <div className="pad">
      <div className={`side-nav ${isOpen ? '' : 'closed'}`}>
        <button 
          className="togglebutton"
          onClick={() => setIsOpen(!isOpen)}
        >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H18V2H0V0Z" fill="currentColor"/>
    <path d="M3 5H15V7H3V5Z" fill="currentColor"/>
    <path d="M6 10H12V12H6V10Z" fill="currentColor"/>
  </svg>
        </button>
        <div className="nav-content">
          <NavFilters 
            selected={selected}
            onSelect={onSelect}
            onPremiumClick={onPremiumClick}
          />
          <TypeFilters 
            selectedCategory={selected}
            onTypeSelect={handleTypeSelect}
            onPremiumClick={onPremiumClick}
          />
          <ABVSlider 
            selectedType={selected}
            onRangeChange={onAbvChange}
            handleAbvChange={handleAbvChange}
            onPremiumClick={onPremiumClick}
          />
        </div>
      </div>
      </div>
    );
};export default SideNav;