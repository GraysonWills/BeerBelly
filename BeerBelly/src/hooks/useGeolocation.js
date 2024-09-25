import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [position, setPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
      }, (error) => {
        console.error("Error getting location:", error);
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return position;
};
