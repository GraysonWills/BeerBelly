import React from 'react';
import '../styles/LocationCard.css';

const LocationCard = ({ location, onSelect, id }) => {
  return (
    <div className="location-card" onClick={() => onSelect(location)} id={id}>
      <h3>{location.name}</h3>
      <p>{location.address}</p>
      <p>Distance: {location.distance.toFixed(2)} miles</p>
      {location.image && <img src={location.image} alt={location.name} />}
      <p>Rating: {location.rating}</p>
      <p>Review: {location.review}</p>
      <a href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer">
        View on Google Maps
      </a>
    </div>
  );
};
export default LocationCard;