import React, { useState, useEffect } from 'react';
import './SearchBox.css';
import SearchIcon from '../Icons/SearchIcon';
import LocationIcon from '../Icons/LocationIcon';
import LayersIcon from '../Icons/LayersIcon';
import { tileLayers } from '../../../utils/mapLayers';

const SearchBox = ({ address, setAddress, handleSearch, handleUseMyLocation, handleClearSearch, error, setCurrentLayer,isPopupOpen }) => {
  const [lastSearchTime, setLastSearchTime] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLayersOpen, setIsLayersOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleLayers = () => setIsLayersOpen(!isLayersOpen);

  return (
    <div className={`search-container ${isPopupOpen && !isMobile ? 'search-box-shifted' : ''}`}>
      <div className="search-input-wrapper">
        <div className="search-input-group">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter an address"
            className="search-input"
          />
          <button onClick={handleClearSearch} className="clear-button">
            {address && <span className="clear-icon">×</span>}
          </button>
          <button onClick={performSearch} className="search-button" aria-label="Search">
            <SearchIcon />
          </button>
          <button onClick={handleUseMyLocation} className="location-button" aria-label="Use my location">
            <LocationIcon />
          </button>
          <button onClick={toggleLayers} className="layers-button" aria-label="Toggle layers">
            <LayersIcon />
          </button>
        </div>
      </div>
      <div className={`layers-dropdown ${isLayersOpen ? 'open' : ''}`}>
        {Object.entries(tileLayers).map(([name, url]) => (
          <button key={name} onClick={() => setCurrentLayer(name)} className="layer-option">
            {name}
          </button>
        ))}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
export default SearchBox;