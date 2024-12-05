import React, { useState, useEffect } from 'react';
import AlcoholSearch from '../../components/ingredients/AlcoholSearch/AlcoholSearch';
import PremiumModal from '../../components/PremiumModal/PremiumModal';
import './Home.css';

const Home = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenPremiumModal');
    if (!hasSeenModal) {
      setShowPremiumModal(true);
      localStorage.setItem('hasSeenPremiumModal', 'true');
    }

    const handleUnload = () => {
      localStorage.removeItem('hasSeenPremiumModal');
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  return (
    <div className="home" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AlcoholSearch />
      <PremiumModal 
        isVisible={showPremiumModal} 
        onClose={() => setShowPremiumModal(false)} 
      />
    </div>
  );
};
export default Home;