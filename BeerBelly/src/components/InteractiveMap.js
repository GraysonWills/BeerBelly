import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/InteractiveMap.css';
import { redIcon } from '../utils/mapIcons';
import { tileLayers } from '../utils/mapLayers';
import { useGeolocation } from '../hooks/useGeolocation';

const InteractiveMap = () => {
  const [address, setAddress] = useState('');
  const [currentLayer, setCurrentLayer] = useState('Satellite');
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isMapCentered, setIsMapCentered] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(13);
  const mapRef = useRef(null);
  const position = useGeolocation();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(position, 13, { duration: 0.5 });
    }
  }, [position]);

  const handleSearch = async () => {
    try {
      const response = await fetch('/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data && data[0]) {
        const newPosition = [data[0].latitude, data[0].longitude];
        mapRef.current.flyTo(newPosition, 13);
      } else {
        console.log('No results found for the given address');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  };

  const toggleLayers = () => setIsLayersOpen(!isLayersOpen);

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(position, currentZoom, { duration: 0.5 });
      setIsMapCentered(true);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.on('moveend', () => {
        const mapCenter = map.getCenter();
        const allowedOffset = 0.001;
        const isCloseEnough = 
          Math.abs(mapCenter.lat - position[0]) < allowedOffset &&
          Math.abs(mapCenter.lng - position[1]) < allowedOffset;
        setIsMapCentered(isCloseEnough);
        setCurrentZoom(map.getZoom());
      });
    }
  }, [position]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000, padding: '25px' }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter an address"
          style={{ width: '300px', height: '50px', fontSize: '16px' }}
        />
        <button onClick={handleSearch} style={{ height: '50px', width: '100px', fontSize: '16px' }}>Search</button>
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
        <button onClick={toggleLayers} style={{ fontSize: '24px', padding: '15px 30px', marginBottom: '10px', display: 'block' }}>Layers</button>
        {!isMapCentered && (
          <button onClick={handleRecenter} style={{ fontSize: '24px', padding: '15px 30px', display: 'block' }}>Recenter</button>
        )}
        {isLayersOpen && (
          <div style={{ backgroundColor: 'white', padding: '10px', marginTop: '5px' }}>
            {Object.keys(tileLayers).map((name) => (
              <div key={name} onClick={() => setCurrentLayer(name)} style={{ cursor: 'pointer', padding: '5px' }}>
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} ref={mapRef}>
        <TileLayer
          url={tileLayers[currentLayer]}
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={redIcon}>
          <Popup autoOpen={true}>
            You are here
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;