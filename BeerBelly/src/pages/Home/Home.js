import React from 'react';
import AlcoholSearch from '../../components/ingredients/AlcoholSearch/AlcoholSearch';
import './Home.css';

const Home = () => {
  return (
    <div className="home" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AlcoholSearch />
    </div>
  );
};

export default Home;
