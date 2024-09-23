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
        {Object.keys(data).map((key) => (
          <InfoCard key={key} descriptor={key} data={data} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
