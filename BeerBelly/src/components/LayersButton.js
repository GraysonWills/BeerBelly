import React from 'react';
import '../styles/LayersButton.css';

const LayersButton = ({ isOpen, toggleLayers, layers, setCurrentLayer }) => (
  <div className="layers-control">
    <button onClick={toggleLayers} className="layers-button" aria-label="Toggle layers">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="layers-icon">
        <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" fill="currentColor"/>
      </svg>
    </button>
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