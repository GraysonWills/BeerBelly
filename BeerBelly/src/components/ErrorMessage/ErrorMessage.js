import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className="error-message">
      {message}
    </div>
  );
};

export default ErrorMessage;
