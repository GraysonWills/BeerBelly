import React from 'react';
import { Form } from 'react-bootstrap';

const RememberMe = () => {
  return (
    <Form.Group className="mb-3">
      <Form.Check 
        type="checkbox"
        label="Remember me"
      />
    </Form.Group>
  );
};

export default RememberMe;
