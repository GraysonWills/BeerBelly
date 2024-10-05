import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import '../styles/LocationPopup.css';
import LocationCard from './LocationCard';
import BreweryTypeFilter from './BreweryTypeFilter';
import DistanceFilter from './DistanceFilter';

const LocationPopup = forwardRef(({ locations, selectedLocation, onSelectLocation, isOpen, onOpenChange, selectedTypes, setSelectedTypes, distance, setDistance }, ref) => {
  const listRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToLocation: (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }));

  const filteredLocations = selectedTypes.length === 0
    ? locations
    : locations.filter(location => selectedTypes.includes(location.breweryType));

  return (
    <div className={`location-popup ${isOpen ? 'open' : 'closed'}`}>
      <div className="sticky-filter-bar">
        <BreweryTypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
        <DistanceFilter distance={distance} setDistance={setDistance} />
      </div>
      <div className="location-list" ref={listRef}>
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onSelect={onSelectLocation}
              id={location.id}
              isEnabled={location.isEnabled}
            />
          ))
        ) : (
          <div className="no-locations-message">No locations found</div>
        )}
      </div>
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