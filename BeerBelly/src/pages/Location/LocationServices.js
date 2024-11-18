  import React from 'react';
  import InteractiveMap from '../../components/location/InteractiveMap/InteractiveMap';
  import CustomNavbar from '../../components/Navbar';
  import './LocationServices.css';

  function LocationServices() {
    return (
      <div className="LocationServices">
        <CustomNavbar />
        <InteractiveMap />
      </div>
    );
  }

  export default LocationServices;