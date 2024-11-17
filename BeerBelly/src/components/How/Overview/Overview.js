import React from 'react';
import { Card } from 'react-bootstrap';
import './Overview.css';

const Overview = ({ alcohol }) => (
  <Card className="detail-section h-100 shadow-sm">
    <Card.Body>
      <h3>Overview</h3>
      <div className="overview-content">
        <p className="description">{alcohol.description}</p>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Difficulty:</span>
            <span className={`stat-value difficulty-${alcohol.difficulty.toLowerCase()}`}>
              {alcohol.difficulty}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Fermentation Time:</span>
            <span className="stat-value">{alcohol.fermentationTime}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Alcohol Content:</span>
            <span className="stat-value">{alcohol.alcoholContent}</span>
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default Overview;
