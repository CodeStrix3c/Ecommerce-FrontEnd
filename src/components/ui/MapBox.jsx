import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

const MapBox = ({ address }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const fetchCoords = async () => {
      if (!address) return;
      try {
        const res = await axios.get(
          'https://nominatim.openstreetmap.org/search',
          {
            params: {
              q: address,
              format: 'json',
              limit: 1,
            },
          },
        );

        if (res.data.length > 0) {
          const { lat, lon } = res.data[0];
          setCoords([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.error('No location found for this address');
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    fetchCoords();
  }, [address]);

  if (!coords) return <p>Finding location...</p>;

  return (
    <MapContainer
      center={coords}
      zoom={14}
      style={{
        width: '100%',
        height: '400px',
        borderRadius: '12px',
        position: 'relative',
        zIndex: 0,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={coords}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapBox;
