import React from 'react';
import { Button } from 'react-bootstrap';

const OAuthButton = ({ icon: Icon, provider, onClick }) => {
  return (
    <Button variant="outline-dark" onClick={onClick}>
      <Icon className={`me-2 ${provider.toLowerCase()}`} /> {provider}
    </Button>
  );
};

export default OAuthButton;
