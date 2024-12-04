import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className="error-message-attempt">
      {message}
    </div>
  );
};

export default ErrorMessage;
