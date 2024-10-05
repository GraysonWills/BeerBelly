import React from 'react';
import '../styles/RecenterButton.css';
import '../styles/global.css';

const RecenterButton = ({ isMapCentered, handleRecenter, deselectMarkers }) => (
  <button 
    onClick={() => {
      handleRecenter();
      deselectMarkers();
    }} 
    className={`control-button recenter-button ${isMapCentered ? 'fade-out' : 'fade-in'}`}
  >
    Recenter
  </button>
);

export default RecenterButton;