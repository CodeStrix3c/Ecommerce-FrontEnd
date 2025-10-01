import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import useIsMobile from "@/hooks/useInMobile";

const MapBox = ({ address }) => {
  const [coords, setCoords] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchCoords = async () => {
      if (!address) return;
      try {
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          { params: { q: address, format: "json", limit: 1 } }
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
    };
    fetchCoords();
  }, [address]);

  if (!coords) return <p>Finding location...</p>;

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        overflow: "hidden",
        zIndex: 0, // reduce z-index
        position: "relative",
        touchAction: "pan-y", // allow vertical scrolling on mobile
      }}
    >
      <MapContainer
        center={coords}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
        dragging={!isMobile ? true : false} // optional: single-finger drag disabled on mobile
        touchZoom={true} // allow two-finger zoom
        scrollWheelZoom={false} // disable scroll wheel zoom
        doubleClickZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={coords}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapBox;
