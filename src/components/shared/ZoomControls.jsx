import React, { useState, useRef } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

const ZoomControls = ({
  children,
  className = "",
  controlsPosition = "top-right",
}) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  // Zoom
  const zoomIn = () => setZoom((z) => Math.min(z + 0.3, 3));

  const zoomOut = () => {
    setZoom((z) => {
      const newZoom = Math.max(z - 0.3, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  // Drag
  const handleMouseDown = (e) => {
    if (zoom === 1) return;
    dragging.current = true;
    start.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    setPosition({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const controlsClass =
    controlsPosition === "top-right"
      ? "absolute top-3 right-3"
      : "absolute bottom-3 right-3";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Image */}
      <div
        onMouseDown={handleMouseDown}
        className={`w-full h-full cursor-${
          zoom > 1 ? "grab active:grabbing" : "default"
        }`}
        style={{
          transform: `scale(${zoom}) translate(${position.x / zoom}px, ${
            position.y / zoom
          }px)`,
          transformOrigin: "center",
          transition: "transform 0.1s",
        }}
      >
        {children}
      </div>

      {/* Controls */}
      <div
        className={`flex items-center gap-1 bg-white/90 backdrop-blur p-1.5 rounded-md shadow z-10 ${controlsClass}`}
      >
        <button
          onClick={zoomIn}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ZoomIn size={18} />
        </button>

        <button
          onClick={zoomOut}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ZoomOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default ZoomControls;
