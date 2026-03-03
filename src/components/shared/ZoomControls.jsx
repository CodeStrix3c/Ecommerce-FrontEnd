import React, { useRef, useState, useEffect } from "react";

const ZoomControls = ({
  children,
  src,
  zoomLevel = 3,
  className = "",
}) => {
  const containerRef = useRef(null);

  const [showZoom, setShowZoom] = useState(false);

  const [bgPosition, setBgPosition] = useState("0px 0px");

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const [lens, setLens] = useState({
    x: 0,
    y: 0,
  });

  const LENS_SIZE = 120;

  useEffect(() => {
    if (!containerRef.current) return;

    const rect =
      containerRef.current.getBoundingClientRect();

    setSize({
      width: rect.width,
      height: rect.height,
    });
  }, [src]);

  const handleMove = (e) => {
    const rect =
      containerRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLens({
      x: x - LENS_SIZE / 2,
      y: y - LENS_SIZE / 2,
    });

    const bgX =
      (x / rect.width) *
      rect.width *
      zoomLevel;

    const bgY =
      (y / rect.height) *
      rect.height *
      zoomLevel;

    setBgPosition(
      `-${bgX - 200}px -${bgY - 200}px`
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMove}
    >
      {/* IMAGE */}
      {children}

      {/* HOVER LENS */}
      {showZoom && (
        <div
          className="absolute border border-gray-400 bg-white/30 pointer-events-none"
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            left: lens.x,
            top: lens.y,
          }}
        />
      )}

      {/* SIDE ZOOM PANEL */}
      {showZoom && (
        <div
          className="absolute top-0 left-full ml-6 z-[9999] border bg-white shadow-lg"
          style={{
            width: 500,
            height: 500,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${size.width * zoomLevel}px ${size.height * zoomLevel
              }px`,
            backgroundPosition: bgPosition,
          }}
        />
      )}
    </div>
  );
};

export default ZoomControls;
