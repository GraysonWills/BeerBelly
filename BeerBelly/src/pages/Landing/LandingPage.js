import React from "react";
import CustomNavbar from "../../components/Navbar";
import Hero from '../../components/landing/Hero/Hero';
import InfoCard from '../../components/landing/InfoCard/InfoCard';
import Footer from '../../components/Footer';

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
      <Footer />
    </div>
  );
};

export default LandingPage;
