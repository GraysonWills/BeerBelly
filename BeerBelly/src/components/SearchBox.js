import React from 'react';

const SearchBox = ({ address, setAddress, handleSearch, handleUseMyLocation, handleClearSearch, isLoading, error }) => (
  <div className="search-container">
    <div className="search-input-wrapper">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
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
    {error && <div className="error-message">{error}</div>}
  </div>
);

export default SearchBox;