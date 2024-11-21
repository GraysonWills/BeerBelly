import React from 'react';
import { Form } from 'react-bootstrap';

const FormInput = ({ type, placeholder, value, onChange, isInvalid, feedback }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      />
      <Form.Control.Feedback type="invalid">
        {feedback}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormInput;