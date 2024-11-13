import React from 'react';
import './SideNav.css';

const SideNav = ({ selected, onSelect }) => {
  const options = ['Beer', 'Liquor', 'Wine'];

  return (
    <div className="side-nav">
      {options.map((option) => (
        <div
          key={option}
          className={`nav-item ${selected === option ? 'selected' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SideNav;
