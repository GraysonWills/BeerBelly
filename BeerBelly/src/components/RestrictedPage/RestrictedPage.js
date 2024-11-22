import React from 'react';
import './RestrictedPage.css';

const RestrictedPage = () => {
  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ 
        height: '100vh',
        backgroundColor: '#FFF7E6'
      }}
    >
      <div className="text-center">
        <h1 
          style={{ color: '#9E4113' }}
          className="typing-text first-text"
        >
          Access Restricted
        </h1>
        <p
          style={{ color: '#9E4113' }}
          className="typing-text second-text"
        >
          You must be 21 or older to access this site.
        </p>
      </div>
    </div>
  );
};

export default RestrictedPage;