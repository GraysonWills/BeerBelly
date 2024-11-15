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
          className="toggle-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '←' : '→'}
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