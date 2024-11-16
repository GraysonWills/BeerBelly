import React, { useState } from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import SideNav from '../SideNav/SideNav';
import PaymentPopup from '../PaymentPopup/PaymentPopup';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchResults from '../SearchResults/SearchResults';
import './AlcoholSearch.css';

const AlcoholSearch = () => {
  const [selectedType, setSelectedType] = useState('Beer');
  const [selectedSubTypes, setSelectedSubTypes] = useState([]);
  const [abvRange, setAbvRange] = useState([0, 100]);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSearch = () => {
    setShowPaymentPopup(true);
  };

  const handleSignUp = () => {
    setShowPaymentPopup(false);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  return (
    <div className="alcohol-search-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div className="alcohol-search" style={{ flex: 1 }}>
        <SideNav 
          selected={selectedType} 
          onSelect={setSelectedType}
          onPremiumClick={() => setShowPaymentPopup(true)}
          onTypeSelect={setSelectedSubTypes}
          onAbvChange={setAbvRange}
        />
        <div className="main-content">
          <SearchBar onSearch={handleSearch} />
          <SearchResults 
            selectedType={selectedType}
            selectedSubTypes={selectedSubTypes}
            abvRange={abvRange}
          />
        </div>
      </div>
      <PaymentPopup
        isVisible={showPaymentPopup}
        onClose={() => setShowPaymentPopup(false)}
        onSignUp={handleSignUp}
      />
      <ErrorMessage
        isVisible={showError}
        message="Sorry, our payment processing is not available right now. Please come back and try again soon."
      />
    </div>
  );};export default AlcoholSearch;
