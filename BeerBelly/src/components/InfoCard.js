import React, { useState } from 'react';
import '../styles/infoCard.css';

const InfoCard = ({ descriptor, data }) => {
  const [hovered, setHovered] = useState(false);

  // Extract the image and description from the data based on the descriptor
  const description = data[descriptor]?.description || "No description available";
  const image = data[descriptor]?.image || "/default-image-path.jpg"; // Default image path if not found

  return (
    <div
      className={`info-card ${hovered ? 'hovered' : ''}`}
      style={{ backgroundImage: `url(${image})` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="info-card-text">
          {description}
        </div>
      )}
    </div>
  );
};

export default InfoCard;
