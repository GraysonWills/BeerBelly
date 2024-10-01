import React, { useEffect } from 'react';
import LocationCard from './LocationCard';
import '../styles/LocationPopup.css';
import { getDistance } from '../utils/distanceUtils';

const LocationPopup = ({ locations, selectedLocation, onSelectLocation, distance, selectedBreweryType, markerPosition, onOpenChange, isOpen }) => {
  const filteredLocations = locations.filter(location => {
    const locationDistance = getDistance(markerPosition[0], markerPosition[1], location.latitude, location.longitude);
    const typeMatch = selectedBreweryType === 'All' || location.brewery_type === selectedBreweryType;
    return locationDistance <= distance && typeMatch;
  });

  return (
    <div className={`location-popup ${isOpen ? 'open' : 'closed'}`}>
      <div className="toggle-button" onClick={() => onOpenChange(!isOpen)}>
        {isOpen ? '←' : '→'}
      </div>
      {isOpen && (
        <div className="location-list">
          {filteredLocations.length > 0 ? (
            filteredLocations.map(location => (
              <LocationCard 
                key={location.id} 
                location={location} 
                onSelect={onSelectLocation}
                id={`location-card-${location.id}`}
              />
            ))
          ) : (
            <div className="no-locations-message">No locations found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationPopup;