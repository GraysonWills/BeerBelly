import React from 'react';
import '../styles/RecenterButton.css';

const RecenterButton = ({ isMapCentered, handleRecenter }) => (
  !isMapCentered && (
    <button onClick={handleRecenter} className="control-button">Recenter</button>
  )
);

export default RecenterButton;
