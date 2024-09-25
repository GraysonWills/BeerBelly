import React from 'react';

const LayersButton = ({ isOpen, toggleLayers, layers, setCurrentLayer }) => (
  <div className="layers-control">
    <button onClick={toggleLayers} className="control-button">Layers</button>
    {isOpen && (
      <div className="layers-menu">
        {Object.keys(layers).map((name) => (
          <div key={name} onClick={() => setCurrentLayer(name)} className="layer-option">
            {name}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default LayersButton;
