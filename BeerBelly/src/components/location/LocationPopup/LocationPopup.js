import React, { forwardRef, useRef, useState, useEffect } from 'react';
import './LocationPopup.css';
import LocationCard from '../LocationCard/LocationCard';
import BreweryTypeFilter from '../BreweryFilter/BreweryTypeFilter';
import DistanceFilter from '../DistanceFilter/DistanceFilter';
import FilterIcon from '../Icons/FilterIcon';
// Import custom hook
import { useScrollToLocation } from '../../../hooks/useScrollToLocation';

const LocationPopup = forwardRef(({ locations, selectedLocation, onSelectLocation, isOpen, onOpenChange, selectedTypes, setSelectedTypes, distance, setDistance }, ref) => {
  const listRef = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (selectedLocation && listRef.current) {
      const selectedCard = document.getElementById(selectedLocation.id);
      if (selectedCard) {
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedLocation]);

  // Use custom hook for scroll functionality
  useScrollToLocation(ref);

  // Handle ripple effect on button click
  const handleRipple = (event) => {
    // ... ripple effect logic
  };


  return (
    <div className={`location-popup ${isOpen ? 'open' : 'closed'}`}>
      <button 
        className={`filter-button ${isFilterOpen ? 'shifted' : ''}`}
        onClick={(e) => {
          setIsFilterOpen(!isFilterOpen);
          handleRipple(e);
        }}
      >
        <FilterIcon />
      </button>

      {/* Filter space */}
      <div className={`filter-space ${isFilterOpen ? 'open' : 'closed'}`}>
        <div className="sticky-filter-bar">
          <BreweryTypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
          <DistanceFilter distance={distance} setDistance={setDistance} />
        </div>
      </div>

      {/* Location list */}
      <div className="location-list" ref={listRef}>
        {locations.length > 0 ? (
          locations.map((location) => (
            location.isEnabled && (
              <LocationCard
                key={location.id}
                location={location}
                onSelect={onSelectLocation}
                id={location.id}
                isEnabled={location.isEnabled}
              />
            )
          ))
        ) : (
          <div className="no-locations-message">No locations found</div>
        )}
      </div>

      {/* Toggle button */}
      <button className="toggle-button" onClick={() => onOpenChange(!isOpen)}>
        <div className="toggle-icon">
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
});
export default LocationPopup;