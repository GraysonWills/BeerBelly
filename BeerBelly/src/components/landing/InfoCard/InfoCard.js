import React from 'react';
import { useNavigate } from 'react-router-dom';
import './infoCard.css';

const InfoCard = ({ descriptor, data }) => {
  const navigate = useNavigate();
  const description = data[descriptor]?.description || "No description available";
  const image = data[descriptor]?.image || "/default-image-path.jpg";
  const link = data[descriptor]?.link || "/";

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div
      className="info-card"
      style={{ backgroundImage: `url(${image})` }}
      onClick={handleClick}
    >
      <div className="info-card-text">
        {description}
      </div>
    </div>
  );
};

export default InfoCard;