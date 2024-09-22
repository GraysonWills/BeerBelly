import React from "react";
import CustomNavbar from "../components/Navbar";
import Hero from '../components/Hero';
import InfoCard from '../components/InfoCard';
import data from '../content/info.json'; // Import the JSON data

const LandingPage = () => {
  return (
    <div>
      <CustomNavbar />
      <Hero />
    
        <div className="card-container">
          <InfoCard descriptor="choose" data={data} />
          <InfoCard descriptor="find" data={data} />
          <InfoCard descriptor="locate" data={data} />
          <InfoCard descriptor="craft" data={data} />
          <InfoCard descriptor="mix" data={data} />
      </div>
    </div>
  );
};

export default LandingPage;
