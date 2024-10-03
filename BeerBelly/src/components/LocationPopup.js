import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import LocationCard from './LocationCard';
import '../styles/LocationPopup.css';
import ToggleIcon from './ToggleIcon';

const LocationPopup = forwardRef(({ locations, selectedLocation, onSelectLocation, isOpen, onOpenChange }, ref) => {
  const popupRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <ToggleIcon isMobile={isMobile} />
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
