import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProcessSteps.css';

const ProcessSteps = ({ alcohol, onStepClick }) => (
  <Card className="detail-section h-100 shadow-sm">
    <Card.Body>
      <h3>Process Steps</h3>
      <div className="steps-container">
        {alcohol.basicSteps.map((step, index) => {
          const stepKey = step.split(' - ')[0].toLowerCase();
          return (
            <div key={index} className="step-item">
              <div className="step-header">
                <span className="step-number">{index + 1}</span>
                <h4>{step.split(' - ')[0]}</h4>
              </div>
              <p className="step-description">{step.split(' - ')[1]}</p>
              {alcohol.stepDetails?.[stepKey] && (
                <Button 
                  variant="link" 
                  className="learn-more-link"
                  onClick={() => onStepClick(stepKey)}
                >
                  Learn More →
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Card.Body>
  </Card>
);

export default ProcessSteps;
