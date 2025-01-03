import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './InteractiveMap.css';
import { redIcon } from '../../../utils/mapIcons';
import { useMapFunctions } from '../../../hooks/useMapFunctions';
import { handleSearch } from '../../../utils/searchUtils';
import { fetchNearbyBreweries } from '../../../utils/breweryUtils';
import { createLocationData } from '../../../utils/LocationData';
import LayersButton from '../LayersButton/LayersButton';
import RecenterButton from '../RecenterButton/RecenterButton';
import SearchBox from '../SearchBox/SearchBox';
import LocationPopup from '../LocationPopup/LocationPopup';
import LocationMarker from '../LocationMarker/LocationMarker';
import { tileLayers } from '../../../utils/mapLayers';

const SetMapConstraints = () => {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.setMinZoom(2.4);
      map.setMaxBounds([[-90, -180], [90, 180]]);
    }
  }, [map]);
  return null;
};

const InteractiveMap = () => {
  const [currentLayer, setCurrentLayer] = useState('Hybrid');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(20);
  const [selectedBreweryType, setSelectedBreweryType] = useState('All');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const mapRef = useRef(null);

  const isLocationEnabled = (location) => {
    const distanceMatch = location.distance <= distance;
    const typeMatch = selectedBreweryType.length === 0 || selectedBreweryType.includes(location.breweryType);
    return distanceMatch && typeMatch;
  };
  const {
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
      const nearbyBreweries = await fetchNearbyBreweries(result.position[0], result.position[1], distance);
      const locationData = await createLocationData(nearbyBreweries, result.position);
      setLocations(locationData);
      setSelectedBreweryType([]); // Reset brewery type filter
      setIsPopupOpen(true);

      if (mapRef.current) {
        const bounds = [result.position, ...locationData.map(l => [l.latitude, l.longitude])];
        mapRef.current.flyToBounds(bounds, {
          padding: [50, 50],
          duration: 2, // Duration in seconds
          easeLinearity: 0.5 // Adjust this value for different easing effects
        });
      }
    }
    setIsLoading(false);
  };

  const locationPopupRef = useRef(null);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setIsPopupOpen(true);
    if (mapRef.current) {
      mapRef.current.flyTo([location.latitude, location.longitude], 15, {
        duration: 2 // Duration in seconds
      });
    }
    if (locationPopupRef.current) {
      locationPopupRef.current.scrollToLocation(location.id);
    }
  };  

  useEffect(() => {
    if (address === "Your Location") {
      handleSearchClick();
    }
  }, [address]);
  
  const handleUseMyLocation = () => {
    setAddress("Your Location");
    setMarkerPosition(position);
  };

  const handleClearSearch = () => {
    setAddress('');
  };

  const handleSelectLocation = (location) => {
    if (mapRef.current) {
      mapRef.current.closePopup();
      mapRef.current.flyTo([location.latitude, location.longitude], 15, {
        duration: 2
      });
      if (markerRefs.current[location.id]) {
        markerRefs.current[location.id].openPopup();
      }
    }
    setSelectedLocation(location);
  };


  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const markerRefs = useRef({});
    const deselectMarkers = () => {
      setSelectedLocation(null);
      if (mapRef.current) {
        mapRef.current.closePopup();
      }
    };

  useEffect(() => {
    setLocations(prevLocations => 
      prevLocations.map(location => ({
        ...location,
        isEnabled: isLocationEnabled(location)
      }))
    );
  }, [distance, selectedBreweryType]);

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
        layers={tileLayers}
        selectedBreweryType={selectedBreweryType}
        setSelectedBreweryType={setSelectedBreweryType}
        isPopupOpen={isPopupOpen}
        setCurrentLayer={setCurrentLayer}
      />
      <div className="controls-container">
        <RecenterButton
          isMapCentered={isMapCentered}
          handleRecenter={handleRecenter}
          deselectMarkers={deselectMarkers}
        />
      </div>
      {isLoading && <div className="spinner-overlay"><div className="spinner"></div></div>}
      <MapContainer center={position} zoom={13} className="map-container" ref={mapRef} zoomControl={false}>
        <SetMapConstraints />
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
        {locations.map((location) => (
          <LocationMarker
            key={location.id}
            location={location}
            onClick={handleMarkerClick}
            isEnabled={location.isEnabled}
            isSelected={selectedLocation && selectedLocation.id === location.id}
            markerRef={(ref) => {
              if (ref) {
                markerRefs.current[location.id] = ref
              } else {
                delete markerRefs.current[location.id]
              }
            }}
          />
        ))}
      </MapContainer>
      <LocationPopup 
        ref={locationPopupRef}
        locations={locations}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
        isOpen={isPopupOpen}
        onOpenChange={setIsPopupOpen}
        selectedTypes={selectedBreweryType}
        setSelectedTypes={setSelectedBreweryType}
        distance={distance}
        setDistance={setDistance}
      />     
    </div>
  );
};

export default InteractiveMap;