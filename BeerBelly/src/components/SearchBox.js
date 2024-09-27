import React from 'react';
import DistanceFilter from './DistanceFilter';

const SearchBox = ({ address, setAddress, handleSearch, handleUseMyLocation, handleClearSearch, isLoading, error, distance, setDistance }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
      <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an address"
          className="search-input"
        />
        {address && (
          <button onClick={handleClearSearch} className="clear-button">×</button>
        )}
      </div>
      <button onClick={handleUseMyLocation} className="location-button">Use My Location</button>
      <button onClick={handleSearch} className="search-button">
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      <DistanceFilter distance={distance} setDistance={setDistance} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchBox;