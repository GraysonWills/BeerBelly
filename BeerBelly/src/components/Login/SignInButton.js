import React from 'react';
import { Button } from 'react-bootstrap';

const SignInButton = ({ text }) => {
  return (
    <Button variant="primary" type="submit" className="w-100 mb-3">
      {text}
    </Button>
  );
};

export default SignInButton;