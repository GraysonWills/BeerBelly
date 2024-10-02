import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { blueIcon } from '../utils/mapIcons';
import '../styles/LocationMarker.css';

const LocationMarker = forwardRef(({ location, onClick }, ref) => {
  const markerRef = useRef();

  useImperativeHandle(ref, () => ({
    openPopup: () => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }
  }));

  return (
    <Marker
      ref={markerRef}
      position={[location.latitude, location.longitude]}
      icon={blueIcon}
      eventHandlers={{
        click: () => onClick(location),
      }}
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
});

export default LocationMarker;