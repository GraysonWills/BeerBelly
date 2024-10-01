import React from 'react';

const LocationCard = ({ location, onSelect, id }) => {
  return (
    <div className="location-card" onClick={() => onSelect(location)} id={id}>
      <h3>{location.name}</h3>
      <p>{location.address}</p>
      <img src={location.image} alt={location.name} />
      <p>Rating: {location.rating}</p>
      <p>Review: {location.review}</p>
    </div>
  );
};

export default LocationCard;