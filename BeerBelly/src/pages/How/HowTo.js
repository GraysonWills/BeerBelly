import React, { useState } from 'react';
import AlcoholGuide from '../../components/How/AlcoholGuide';
import alcoholData from '../../content/alcohols.json';

const HowTo = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };
  return (
    <div className="how-to" style={{ overflowX: 'hidden' }}>
      <header className="text-center py-4" style={{ 
        color: '#9E4113',
        borderBottom: '2px solid #9E4113'
      }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '10px' }}>
          Hone Your Craft
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.4' }}>
        The Art of Making Alcohol - Master the Ancient Art of Fermentation
        </p>
      </header>
      <main>
        {Object.keys(alcoholData).map((key) => (
          <AlcoholGuide 
            key={key}
            descriptor={key}
            data={alcoholData}
            isExpanded={activeSection === key}
            onToggle={() => toggleSection(key)}
          />
        ))}
      </main>
    </div>
  );
};

export default HowTo;