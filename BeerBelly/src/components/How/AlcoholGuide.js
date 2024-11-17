import React, { useState, useRef } from 'react';
import { Container, Row, Col, Collapse } from 'react-bootstrap';
import StepModal from './StepModal/StepModal';
import Overview from './Overview/Overview';
import Ingredients from './Ingredients/Ingredients';
import ProcessSteps from './ProcessSteps/ProcessSteps';
import './AlcoholGuide.css';

const AlcoholGuide = ({ descriptor, data, isExpanded, onToggle }) => {
  const sectionRef = useRef(null);
  const alcohol = data[descriptor];
  const [selectedStep, setSelectedStep] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleStepClick = (stepKey) => {
    const stepDetails = alcohol.stepDetails[stepKey];
    setSelectedStep(stepDetails);
    setShowModal(true);
  };

  const handleIngredientClick = (ingredientKey) => {
    const ingredientDetails = alcohol.ingredientDetails[ingredientKey];
    setSelectedStep(ingredientDetails);
    setShowModal(true);
  };

  return (
    <section className="alcohol-section" ref={sectionRef}>
      <div className="position-relative w-100" onClick={onToggle}>
        <div className="alcohol-header" style={{ backgroundImage: `url(${alcohol.backgroundImage})` }}>
          <div className="alcohol-title-container d-flex justify-content-between align-items-center">
            <h2 className="alcohol-title mb-0">{alcohol.title}</h2>
            <span className={`expand-arrow ${isExpanded ? 'active' : ''}`}>∨</span>
          </div>
        </div>
      </div>
      
      <Collapse in={isExpanded}>
        <div>
          <Container fluid className="py-4">
            <Row className="g-4">
              <Col xs={12} md={4}>
                <Overview alcohol={alcohol} />
              </Col>
              <Col xs={12} md={4}>
                <Ingredients 
                  alcohol={alcohol} 
                  onIngredientClick={handleIngredientClick} 
                />
              </Col>
              <Col xs={12} md={4}>
                <ProcessSteps 
                  alcohol={alcohol} 
                  onStepClick={handleStepClick} 
                />
              </Col>
            </Row>
          </Container>
        </div>
      </Collapse>

      <StepModal 
        step={selectedStep}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </section>
  );
};

export default AlcoholGuide;