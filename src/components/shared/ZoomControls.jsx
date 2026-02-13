import React, { useState, useRef, useEffect } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

const ZoomControls = ({
  children,
  className = "",
  controlsPosition = "top-right",
}) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const STEP = 0.3;

  // Zoom
  const zoomIn = () => setZoom((z) => Math.min(z + STEP, MAX_ZOOM));

  const zoomOut = () => {
    setZoom((z) => {
      const newZoom = Math.max(z - STEP, MIN_ZOOM);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  // Start drag (LEFT click)
  const handleMouseDown = (e) => {
    if (e.button !== 0 || zoom === 1) return;

    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      lastPos.current = { x: e.clientX, y: e.clientY };

      setPosition((pos) => ({
        x: pos.x + dx,
        y: pos.y + dy,
      }));
    };

    const handleUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  const controlsClass =
    controlsPosition === "top-right"
      ? "absolute top-3 right-3"
      : "absolute bottom-3 right-3";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
    >
      {/* Content */}
      <div
        className="w-full h-full"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          transformOrigin: "center",
          transition: isDragging.current
            ? "none"
            : "transform 0.15s ease-out",
          cursor: zoom > 1
            ? isDragging.current
              ? "grabbing"
              : "grab"
            : "default",
        }}
      >
        {children}
      </div>

      {/* Controls */}
      <div
        className={`flex items-center gap-1 bg-white/90 backdrop-blur p-1.5 rounded-md shadow z-10 ${controlsClass}`}
      >
        {zoom > 1 && (
          <button onClick={zoomOut} className="p-1 rounded hover:bg-gray-100">
            <ZoomOut size={18} />
          </button>
        )}

        {zoom < MAX_ZOOM && (
          <button onClick={zoomIn} className="p-1 rounded hover:bg-gray-100">
            <ZoomIn size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ZoomControls;
