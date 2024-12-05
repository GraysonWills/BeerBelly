import React, { useState, useEffect } from 'react';
import ErrorMessage from '../ingredients/ErrorMessage/ErrorMessage';
import './PremiumModal.css';

const PremiumModal = ({ isVisible, onClose }) => {
  const [showError, setShowError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleButtonClick = () => {
    onClose();
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  return (
    <>
      {isVisible && (
        <div className="premium-modal-overlay">
          <div className="premium-modal-content">
            <button className="close-button" onClick={onClose}>×</button>
            
            <div className="limited-time">
              <span className="pulse">Limited Time Offer!</span>
              <div className="countdown">Expires in: {formatTime(timeLeft)}</div>
            </div>

            <div className="premium-price-box">
              <div className="original-price">$1.99</div>
              <div className="free-offer">First Month Free!</div>
            </div>

            <h2>Upgrade to Premium</h2>
            <p>Unlock all premium features and enhance your experience</p>
            
            <button className="signup-button" onClick={handleButtonClick}>Start Free Trial</button>
            <button className="maybe-later" onClick={handleButtonClick}>Maybe Later</button>
          </div>
        </div>
      )}
      <ErrorMessage 
        isVisible={showError}
        message="Sorry, our payment processing is not available right now. Please come back and try again soon."
      />
    </>
  );
};

export default PremiumModal;