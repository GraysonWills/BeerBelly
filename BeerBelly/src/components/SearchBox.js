import React, { useState, useEffect } from 'react';
import DistanceFilter from './DistanceFilter';
import BreweryTypeFilter from './BreweryTypeFilter';
import '../styles/SearchBox.css';

const SearchBox = ({ address, setAddress, handleSearch, handleUseMyLocation, handleClearSearch, isLoading, error, distance, setDistance, selectedBreweryType, setSelectedBreweryType, isPopupOpen }) => {
  const [lastSearchTime, setLastSearchTime] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const performSearch = () => {
    const now = Date.now();
    if (now - lastSearchTime >= 3000) {
      handleSearch();
      setLastSearchTime(now);
      setIsRateLimited(false);
    } else {
      setIsRateLimited(true);
    }
  };

  useEffect(() => {
    if (isRateLimited) {
      const timer = setTimeout(() => setIsRateLimited(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isRateLimited]);

  return (
    <div className={`search-container ${isPopupOpen ? 'search-box-shifted' : ''}`}>
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
      <button onClick={performSearch} className={`search-button ${isRateLimited ? 'rate-limited' : ''}`} disabled={isRateLimited}>
        {isLoading ? 'Searching...' : isRateLimited ? 'Wait 3s' : 'Search'}
      </button>
      <div className="filter-container">
        <DistanceFilter distance={distance} setDistance={setDistance} />
        <BreweryTypeFilter selectedType={selectedBreweryType} setSelectedType={setSelectedBreweryType} />
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchBox;