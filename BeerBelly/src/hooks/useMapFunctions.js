import { useState, useCallback, useEffect } from 'react';
import { useGeolocation } from './useGeolocation';

export const useMapFunctions = (mapRef) => {
  const [currentLayer, setCurrentLayer] = useState('Satellite');
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isMapCentered, setIsMapCentered] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(13);
  const [markerPosition, setMarkerPosition] = useState(null);
  const position = useGeolocation();

  const toggleLayers = useCallback(() => setIsLayersOpen(prev => !prev), []);

  const handleRecenter = useCallback(() => {
    if (mapRef.current && markerPosition) {
      mapRef.current.flyTo(markerPosition, currentZoom, { duration: 0.5 });
      setIsMapCentered(true);
      return true; // Return true to indicate recentering occurred
    }
    return false; // Return false if recentering didn't occur
  }, [markerPosition, currentZoom]);

  useEffect(() => {
    if (position && mapRef.current) {
      mapRef.current.flyTo(position, 13);
      setMarkerPosition(position);
    }
  }, [position]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const handleMoveEnd = () => {
        const currentZoom = map.getZoom();
        const zoomThreshold = 10; // Adjust this value based on your needs

        if (currentZoom >= zoomThreshold) {
          const mapCenter = map.getCenter();
          const allowedOffset = 0.001;
          const isCloseEnough = 
            markerPosition &&
            Math.abs(mapCenter.lat - markerPosition[0]) < allowedOffset &&
            Math.abs(mapCenter.lng - markerPosition[1]) < allowedOffset;
          setIsMapCentered(isCloseEnough);
        } else {
          setIsMapCentered(true);
        }
        setCurrentZoom(map.getZoom());
      };
      map.on('moveend', handleMoveEnd);
      return () => map.off('moveend', handleMoveEnd);
    }
  }, [markerPosition]);

  return {
    currentLayer,
    setCurrentLayer,
    isLayersOpen,
    toggleLayers,
    isMapCentered,
    currentZoom,
    markerPosition,
    setMarkerPosition,
    position,
    handleRecenter
  };
};