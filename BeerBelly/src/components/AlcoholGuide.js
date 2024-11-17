import React, { useState, useRef } from 'react';
import { Container, Row, Col, Collapse } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AlcoholGuide.css';

const AlcoholGuide = ({ descriptor, data, isExpanded, onToggle }) => {
  const sectionRef = useRef(null);
  const alcohol = data[descriptor];
  const [items, setItems] = useState(alcohol.basicSteps.slice(0, 5));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreSteps = () => {
    if (items.length >= alcohol.basicSteps.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setItems([...items, ...alcohol.basicSteps.slice(items.length, items.length + 5)]);
    }, 500);
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
      <Collapse in={isExpanded} onEntered={() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}>
        <div>
          <Container fluid className="py-4">
            <Row className="g-4">
              <Col xs={12} md={4}>
                <div className="detail-section h-100">
                  <h3>Overview</h3>
                  <p>{alcohol.description}</p>
                  <p><strong>Difficulty:</strong> {alcohol.difficulty}</p>
                  <p><strong>Fermentation Time:</strong> {alcohol.fermentationTime}</p>
                  <p><strong>Alcohol Content:</strong> {alcohol.alcoholContent}</p>
                </div>
              </Col>
              
              <Col xs={12} md={4}>
                <div className="detail-section h-100">
                  <h3>Ingredients</h3>
                  <ul className="list-unstyled">
                    {alcohol.ingredients.map((ingredient, index) => (
                      <li key={index} className="mb-2">{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </Col>
              
              <Col xs={12} md={4}>
                <div className="detail-section h-100">
                  <h3>Basic Steps</h3>
                  <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreSteps}
                    hasMore={hasMore}
                    loader={<h4>Loading more steps...</h4>}
                    scrollableTarget="basic-steps"
                  >
                    <ul className="list-unstyled">
                      {items.map((step, index) => (
                        <li key={index} className="mb-2">{step}</li>
                      ))}
                    </ul>
                  </InfiniteScroll>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Collapse>
    </section>
  );
};

export default AlcoholGuide;