import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import './AgeVerificationModal.css';

const AgeVerificationModal = ({ show }) => {
  const [date, setDate] = useState({ month: '', day: '', year: '' });
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (e, field) => {
    const value = e.target.value;
    const maxLengths = { month: 2, day: 2, year: 4 };
    
    if (value.length <= maxLengths[field] && /^\d*$/.test(value)) {
      const newDate = { ...date, [field]: value };
      setDate(newDate);
      setIsComplete(newDate.month.length === 2 && 
                   newDate.day.length === 2 && 
                   newDate.year.length === 4);
    }
  };

  const checkAge = (e) => {
    e.preventDefault();
    const birthDate = new Date(`${date.year}-${date.month}-${date.day}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - (birthDate.getMonth() - 1);
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 21) {
      localStorage.setItem('isAgeVerified', 'true');
    } else {
      localStorage.setItem('isAgeVerified', 'false');
    }
    window.location.reload();
  };

  return (
    <Modal show={show} backdrop="static" keyboard={false} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>Age Verification Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={checkAge}>
          <div className="d-flex justify-content-center gap-3">
            <Form.Group>
              <Form.Label>MM</Form.Label>
              <Form.Control
                type="text"
                value={date.month}
                onChange={(e) => handleChange(e, 'month')}
                placeholder="MM"
                maxLength="2"
                className="text-center"
                style={{ width: '60px' }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>DD</Form.Label>
              <Form.Control
                type="text"
                value={date.day}
                onChange={(e) => handleChange(e, 'day')}
                placeholder="DD"
                maxLength="2"
                className="text-center"
                style={{ width: '60px' }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>YYYY</Form.Label>
              <Form.Control
                type="text"
                value={date.year}
                onChange={(e) => handleChange(e, 'year')}
                placeholder="YYYY"
                maxLength="4"
                className="text-center"
                style={{ width: '80px' }}
              />
            </Form.Group>
          </div>
          <div className="text-center mt-4">
            <Button 
            className="age-verify-btn"
              type="submit" 
              disabled={!isComplete}
            >
              Verify Age
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AgeVerificationModal;