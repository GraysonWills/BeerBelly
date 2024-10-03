import React from 'react';
import '../styles/RecenterButton.css';
import '../styles/global.css';

const RecenterButton = ({ isMapCentered, handleRecenter, deselectMarkers }) => (
  <div className="control-button recenter-control">
    <button 
      onClick={() => {
        handleRecenter();
        deselectMarkers();
      }} 
      className={`recenter-button ${isMapCentered ? 'fade-out' : 'fade-in'}`}
    >
      Recenter
    </button>
  </div>
);

export default RecenterButton;