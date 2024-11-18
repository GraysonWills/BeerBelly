import React, { useState } from 'react';
import './DistanceFilter.css';
  const DistanceFilter = ({ distance, setDistance }) => {
    const [inputValue, setInputValue] = useState(distance.toString());

    const handleInputKeyPress = (e) => {
      if (e.key === 'Enter') {
        updateDistance();
      }
    };

    const updateDistance = () => {
      const value = parseInt(inputValue);
      if (!isNaN(value) && value >= 1 && value <= 100) {
        setDistance(value);
      } else {
        setInputValue(distance.toString());
      }
    };

    return (
      <div className="distance-filter">
        <input
          type="range"
          min="1"
          max="100"
          value={distance}
          onChange={(e) => {
            setDistance(parseInt(e.target.value));
            setInputValue(e.target.value);
          }}
          className="distance-slider"
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={updateDistance}
          onKeyPress={handleInputKeyPress}
          className="distance-input"
        />
        <span>miles</span>
      </div>
    );
  };export default DistanceFilter;
