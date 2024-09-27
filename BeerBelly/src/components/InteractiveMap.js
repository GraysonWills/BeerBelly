import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/InteractiveMap.css';
import { redIcon, blueIcon } from '../utils/mapIcons';
import { tileLayers } from '../utils/mapLayers';
import { useMapFunctions } from '../hooks/useMapFunctions';
import { handleSearch } from '../utils/searchUtils';
import { fetchNearbyBreweries } from '../utils/breweryUtils';
import { getDistance } from '../utils/distanceUtils';
import LayersButton from './LayersButton';
import RecenterButton from './RecenterButton';
import SearchBox from './SearchBox';
  const InteractiveMap = () => {
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [breweries, setBreweries] = useState([]);
    const [distance, setDistance] = useState(20);
    const mapRef = useRef(null);
    const {
      currentLayer,
      setCurrentLayer,
      isLayersOpen,
      toggleLayers,
      isMapCentered,
      markerPosition,
      setMarkerPosition,
      position,
      handleRecenter
    } = useMapFunctions(mapRef);

    const handleSearchClick = async () => {
      setIsLoading(true);
      setError(null);
      const result = await handleSearch(address, position, setMarkerPosition, setError);
      if (result && result.position) {
        setAddress(result.address);
        console.log(result.position);
        console.log("here");
        const nearbyBreweries = await fetchNearbyBreweries(result.position[0], result.position[1], distance);
        setBreweries(nearbyBreweries);
      
        if (mapRef.current) {
          const bounds = [result.position, ...nearbyBreweries.map(b => [b.latitude, b.longitude])];
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }
      setIsLoading(false);
    };

    const handleUseMyLocation = () => {
      setAddress("Your Location");
      setMarkerPosition(position);
    };

    const handleClearSearch = () => {
      setAddress('');
    };

    const filteredBreweries = breweries.filter(brewery => {
      const breweryDistance = getDistance(markerPosition[0], markerPosition[1], brewery.latitude, brewery.longitude);
      return breweryDistance <= distance;
    });

    return (
      <div className="interactive-map-container">
        <SearchBox
          address={address}
          setAddress={setAddress}
          handleSearch={handleSearchClick}
          handleUseMyLocation={handleUseMyLocation}
          handleClearSearch={handleClearSearch}
          isLoading={isLoading}
          error={error}
          distance={distance}
          setDistance={setDistance}
        />
        <div className="controls-container">
          <LayersButton
            isOpen={isLayersOpen}
            toggleLayers={toggleLayers}
            layers={tileLayers}
            setCurrentLayer={setCurrentLayer}
          />
          <RecenterButton
            isMapCentered={isMapCentered}
            handleRecenter={handleRecenter}
          />
        </div>
        {isLoading && <div className="spinner-overlay"><div className="spinner"></div></div>}
        <MapContainer center={position} zoom={13} className="map-container" ref={mapRef}>
          <TileLayer
            url={tileLayers[currentLayer]}
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markerPosition && (
            <Marker position={markerPosition} icon={redIcon}>
              <Popup>
                <div>
                  <strong>{address}</strong>
                  <br />
                  Searched Location
                </div>
              </Popup>
            </Marker>
          )}
          {filteredBreweries.map((brewery) => {
            const breweryDistance = getDistance(markerPosition[0], markerPosition[1], brewery.latitude, brewery.longitude);
            return (
              <Marker 
                key={brewery.id} 
                position={[brewery.latitude, brewery.longitude]} 
                icon={blueIcon}
              >
                <Popup>
                  <div>
                    <strong>{brewery.name}</strong>
                    <br />
                    {brewery.street}
                    <br />
                    {brewery.city}, {brewery.state} {brewery.postal_code}
                    <br />
                    Distance: {breweryDistance.toFixed(2)} miles
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    );
  };
export default InteractiveMap;