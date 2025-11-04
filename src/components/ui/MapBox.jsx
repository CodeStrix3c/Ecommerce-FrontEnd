import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import useIsMobile from "@/hooks/useInMobile";

const MapBox = ({ address, lat, lng }) => {
  const [coords, setCoords] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchCoords = async () => {
      if (lat && lng) {
        setCoords([parseFloat(lat), parseFloat(lng)]);
        return;
      }

      if (address) {
        try {
          const res = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
              params: { q: address, format: "json", limit: 1 },
            }
          );
          if (res.data.length > 0) {
            const { lat, lon } = res.data[0];
            setCoords([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.error("No location found for this address");
          }
        } catch (error) {
          console.error("Geocoding error:", error);
        }
      }
    };

    fetchCoords();
  }, [address, lat, lng]);

  if (!coords) return <p>Finding location...</p>;

  return (
    <div
      style={{
        width: "100%",
        marginTop: "30px",
        height: "300px",
        borderRadius: "12px",
        overflow: "hidden",
        zIndex: 0,
        position: "relative",
        touchAction: "pan-y",
      }}
    >
      <MapContainer
        center={coords}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
        dragging={!isMobile}
        touchZoom={true}
        scrollWheelZoom={false}
        doubleClickZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={coords}>
          <Popup>{address || `Lat: ${coords[0]}, Lng: ${coords[1]}`}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapBox;
