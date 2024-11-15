import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './ABVSlider.css';
  const ABVSlider = ({ selectedType, onRangeChange, dummyResults, onPremiumClick }) => {
    const maxAbv = 8;
    const [values, setValues] = useState([0, maxAbv]);

    return (
      <div className="abv-slider">
        <h3 className="slider-title">Filter by ABV %</h3>
        <div className="slider-container" onClick={onPremiumClick}>
          <Slider
            range
            min={0}
            max={maxAbv}
            value={values}
            disabled={true}
            trackStyle={[{ backgroundColor: '#9E4113' }]}
            handleStyle={[
              { borderColor: '#9E4113', backgroundColor: '#fff', cursor: 'pointer', boxShadow: '0 2px 4px rgba(158, 65, 19, 0.2)' },
              { borderColor: '#9E4113', backgroundColor: '#fff', cursor: 'pointer', boxShadow: '0 2px 4px rgba(158, 65, 19, 0.2)' }
            ]}
            railStyle={{ backgroundColor: '#f5f5f5' }}
          />
        </div>
        {/* <div className="range-inputs">
          <div className="input-group">
             <label>Min</label>
            <input
              type="number"
              min="0"
              max={maxAbv}
              value={values[0]}
              onClick={onPremiumClick}
            />
          </div>
          <div className="input-group">
            <label>Max</label>
            <input
              type="number"
              min="0"
              max={maxAbv}
              value={values[1]}
              onClick={onPremiumClick}
            /> 
          </div>
        </div> */}
        <div className="premium-lock">
          🔒 Premium Feature
        </div>
      </div>
    );
  };
export default ABVSlider;