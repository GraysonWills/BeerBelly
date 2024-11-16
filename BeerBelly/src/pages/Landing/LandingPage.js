import React from "react";
import CustomNavbar from "../../components/landing/Navbar";
import Hero from '../../components/landing/Hero/Hero';
import InfoCard from '../../components/landing/InfoCard/InfoCard';
import data from '../../content/info.json'; // Import the JSON data

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <div className="card-container">
        {Object.keys(data).map((key) => (
          <InfoCard key={key} descriptor={key} data={data} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
