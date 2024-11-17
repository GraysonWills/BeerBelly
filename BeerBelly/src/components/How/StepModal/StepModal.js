import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './StepModal.css';

const StepModal = ({ step, show, onHide }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>{step?.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{step?.description}</p>
      {step?.learnMoreUrl && (
        <Button 
          href={step.learnMoreUrl} 
          variant="outline-primary"
          className="learn-more-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </Button>
      )}
    </Modal.Body>
  </Modal>
);

export default StepModal;