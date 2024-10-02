import React from 'react';
import '../styles/RecenterButton.css';

const RecenterButton = ({ isMapCentered, handleRecenter }) => (
  <button 
    onClick={handleRecenter} 
    className={`control-button recenter-button ${isMapCentered ? 'fade-out' : 'fade-in'}`}
  >
    Recenter
  </button>
);

export default RecenterButton;