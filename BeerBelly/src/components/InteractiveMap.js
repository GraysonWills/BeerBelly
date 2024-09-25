import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const InteractiveMap = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [address, setAddress] = useState('');
  const mapRef = useRef(null);

  const handleSearch = async () => {
    try {
        console.log(address);
      const response = await fetch('/geocode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data[0]) {
        const newPosition = [data[0].latitude, data[0].longitude];
        setPosition(newPosition);
        mapRef.current.flyTo(newPosition, 13);
      } else {
        console.log('No results found for the given address');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      // Here you could set some state to show an error message to the user
    }
  };

  const tileLayers = {
    'OpenStreetMap': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    'Topographical': 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    'Satellite': 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    'Terrain': 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    'Toner': 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png',
    'Hybrid': 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    // 'Transport': 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=YOUR_API_KEY'
  };

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
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} ref={mapRef}>
        <LayersControl position="topright">
          {Object.entries(tileLayers).map(([name, url]) => (
            <LayersControl.BaseLayer key={name} name={name}>
              <TileLayer
                url={url}
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
