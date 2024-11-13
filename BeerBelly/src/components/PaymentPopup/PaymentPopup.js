import React from 'react';
import Button from '../Button/Button';
import './PaymentPopup.css';

const PaymentPopup = ({ isVisible, onClose, onSignUp }) => {
  if (!isVisible) return null;

  return (
    <div className="popup-container">
      <div className="popup-overlay" onClick={onClose} />
      <div className="popup-content">
        <h2>Premium Feature</h2>
        <p>Only paid members are able to utilize this feature. Please register for an account for $4.99</p>
        <Button text="Sign Up!" onClick={onSignUp} />
      </div>
    </div>
  );
};

export default PaymentPopup;
