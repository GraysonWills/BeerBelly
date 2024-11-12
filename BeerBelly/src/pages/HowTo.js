import React, { useState } from 'react';
import AlcoholGuide from '../components/AlcoholGuide';
import alcoholData from '../content/alcohols.json';

const HowTo = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="how-to">
      <header className="text-center py-4">
        <h1>The Art of Making Alcohol</h1>
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