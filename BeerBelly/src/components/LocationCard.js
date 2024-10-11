import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/LocationCard.css';

const LocationCard = ({ location, onSelect, id, isEnabled }) => {
  const isValidImageUrl = (url) => {
    return url && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif'));
  };

  const validPhotos = location.photos.filter(photo => isValidImageUrl(photo.prefix + 'original' + photo.suffix));

  return (
    <div className={`location-card ${isEnabled ? 'enabled' : 'disabled'}`} onClick={() => isEnabled && onSelect(location)} id={id}>
      <h3>{location.name}</h3>
      <p>{location.address}</p>
      <p>Distance: {location.distance.toFixed(2)} miles</p>
      {validPhotos.length > 0 && (
        <div className="carousel-container">
          <Carousel 
            showArrows={true} 
            showThumbs={false} 
            showStatus={false} 
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={500}
            emulateTouch={true}
          >
            {validPhotos.map((photo, index) => (
              <div key={index} className="carousel-slide">
                <img src={photo.prefix + 'original' + photo.suffix} alt={`${location.name} - ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
      <p>Rating: {location.rating}</p>
      {/* <p>Review: {location.review}</p> */}
      <a href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer">
        View on Google Maps
      </a>
    </div>
  );
};

export default LocationCard;