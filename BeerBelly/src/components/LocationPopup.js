import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import LocationCard from './LocationCard';
import '../styles/LocationPopup.css';

const LocationPopup = forwardRef(({ locations, selectedLocation, onSelectLocation, isOpen, onOpenChange }, ref) => {
  const popupRef = useRef(null);

  
const scrollToLocation = (locationId) => {
    if (popupRef.current) {
      const locationCard = popupRef.current.querySelector(`#location-card-${locationId}`);
      if (locationCard) {
        const popupContainer = popupRef.current.querySelector('.location-list');
        const cardTop = locationCard.offsetTop;
        popupContainer.scrollTo({
          top: cardTop,
          behavior: 'smooth'
        });
      }
    }
  };

  useImperativeHandle(ref, () => ({
    scrollToLocation: (locationId) => {
      if (popupRef.current) {
        const locationCard = popupRef.current.querySelector(`#location-card-${locationId}`);
        if (locationCard) {
          const popupContainer = popupRef.current.querySelector('.location-list');
          const cardTop = locationCard.offsetTop;
          popupContainer.scrollTo({
            top: cardTop,
            behavior: 'smooth'
          });
        }
      }
    }
  }));

  return (
    <div ref={popupRef} className={`location-popup ${isOpen ? 'open' : 'closed'}`}>
      <div className="toggle-button" onClick={() => onOpenChange(!isOpen)}>
        {isOpen ? '←' : '→'}
      </div>
      {isOpen && (
        <div className="location-list">
          {locations.filter(location => location.isEnabled).map((location) => (
            <LocationCard
              key={location.id}
              id={`location-card-${location.id}`}
              location={location}
              onSelect={(loc) => {
                onSelectLocation(loc)
                scrollToLocation(loc.id)
              }}
              isEnabled={location.isEnabled}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default LocationPopup;

