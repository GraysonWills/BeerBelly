import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Ingredients.css';

const Ingredients = ({ alcohol, onIngredientClick }) => (
  <Card className="detail-section h-100 shadow-sm">
    <Card.Body>
      <h3>Ingredients</h3>
      <div className="steps-container">
        {alcohol.ingredients.map((ingredient, index) => {
          const ingredientKey = ingredient.split(' ')[0].toLowerCase();
          return (
            <div key={index} className="step-item">
              <div className="step-header">
                <span className="step-number">{index + 1}</span>
                <h4>{ingredient}</h4>
              </div>
              {alcohol.ingredientDetails?.[ingredientKey] && (
                <Button 
                  variant="link" 
                  className="learn-more-link"
                  onClick={() => onIngredientClick(ingredientKey)}
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

export default Ingredients;
