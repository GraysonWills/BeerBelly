import React from 'react';
import './RecenterButton.css';


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