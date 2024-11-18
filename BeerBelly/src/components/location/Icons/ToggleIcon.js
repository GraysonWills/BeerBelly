import React from 'react';

const ToggleIcon = ({ isMobile }) => (
  <div className={`toggle-icon ${isMobile ? 'mobile' : ''}`}>
    <span></span>
    <span></span>
    <span></span>
  </div>
);

export default ToggleIcon;
