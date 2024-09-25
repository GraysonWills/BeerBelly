import L from 'leaflet';

export const yellowPersonIcon = new L.Icon({
  iconUrl: '/path/to/your/yellow-person-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [50, 82],
  iconAnchor: [25, 82],
  popupAnchor: [1, -76],
  shadowSize: [82, 82]
});

L.Marker.prototype.options.icon = redIcon;
