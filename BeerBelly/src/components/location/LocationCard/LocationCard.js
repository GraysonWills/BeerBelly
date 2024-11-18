import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './LocationCard.css';

const LocationCard = ({ location, onSelect, id, isEnabled }) => {
  const isValidImageUrl = (url) => {
    return url && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif'));
  };

  return (
    <div className={`location-card ${isEnabled ? 'enabled' : 'disabled'}`} onClick={() => isEnabled && onSelect(location)} id={id}>
      <h3>{location.name}</h3>
      <p>{location.address}</p>
      <p>Distance: {location.distance.toFixed(2)} miles</p>
      <a href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer">
        View on Google Maps
      </a>
      <div className="api-credit">
        Sourced from OpenBreweryDB
      </div>
    </div>
  );
};

export default LocationCard;