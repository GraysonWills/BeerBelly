import React, { useRef, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { blueIcon } from '../../../utils/mapIcons';
import './LocationMarker.css';

const LocationMarker = ({ location, onClick, isEnabled, markerRef, isSelected }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (isSelected && popupRef.current) {
      popupRef.current.openPopup();
    }
  }, [isSelected]);

  if (!isEnabled) return null;

  return (
    <Marker
      position={[location.latitude, location.longitude]}
      icon={blueIcon}
      eventHandlers={{
        click: () => onClick(location),
      }}
      ref={popupRef}
      className={isSelected ? 'selected' : ''}
    >
      <Popup>
        <div className="location-marker-popup">
          <h3>{location.name}</h3>
          <p>{location.address}</p>
          <p>Distance: {location.distance.toFixed(2)} miles</p>
          <a href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer">
            Travel Here!
          </a>
        </div>
      </Popup>
    </Marker>
  );
};export default LocationMarker;