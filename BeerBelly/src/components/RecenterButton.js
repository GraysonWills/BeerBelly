import React from 'react';

const RecenterButton = ({ isMapCentered, handleRecenter }) => (
  !isMapCentered && (
    <button onClick={handleRecenter} className="control-button">Recenter</button>
  )
);

export default RecenterButton;
