import React, { useEffect, useRef } from 'react';
import LocationCard from './LocationCard';
import '../styles/LocationPopup.css';

const LocationPopup = ({ locations, selectedLocation, onSelectLocation, isOpen, onOpenChange }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (selectedLocation && popupRef.current) {
      const selectedCard = popupRef.current.querySelector(`#location-card-${selectedLocation.id}`);
      if (selectedCard) {
        const popupContainer = popupRef.current.querySelector('.location-list');
        const cardTop = selectedCard.offsetTop;
        popupContainer.scrollTo({
          top: cardTop,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedLocation]);

  return (
    <div ref={popupRef} className={`location-popup ${isOpen ? 'open' : 'closed'}`}>
      <div className="toggle-button" onClick={() => onOpenChange(!isOpen)}>
        {isOpen ? '←' : '→'}
      </div>
      {isOpen && (
        <div className="location-list">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              id={`location-card-${location.id}`}
              location={location}
              onSelect={onSelectLocation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationPopup;