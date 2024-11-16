import React from 'react';
import './infoCard.css';

const InfoCard = ({ descriptor, data }) => {
  const description = data[descriptor]?.description || "No description available";
  const image = data[descriptor]?.image || "/default-image-path.jpg";

  return (
    <div
      className="info-card"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="info-card-text">
        {description}
      </div>
    </div>
  );
};

export default InfoCard;