import React from 'react';
import { Button } from 'react-bootstrap';

const SignInButton = ({ text, onClick }) => {
  return (
    <Button 
      variant="primary" 
      type="button" 
      className="w-100 mb-3" 
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default SignInButton;