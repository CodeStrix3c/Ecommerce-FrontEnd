import React, { useRef, useState } from "react";

const ZoomControls = ({
  src,
  zoomLevel = 2.5,
  className = "",
}) => {
  const containerRef = useRef(null);

  const [showZoom, setShowZoom] = useState(false);

  const [lens, setLens] = useState({ x: 0, y: 0 });

  const [bgPosition, setBgPosition] = useState("0px 0px");

  const [imgNaturalSize, setImgNaturalSize] = useState({
    width: 0,
    height: 0,
  });

  const LENS_SIZE = 140;
  const PANEL_SIZE = 500;

  const handleMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const half = LENS_SIZE / 2;

    // ✅ Keep lens inside container
    x = Math.max(half, Math.min(x, rect.width - half));
    y = Math.max(half, Math.min(y, rect.height - half));

    setLens({
      x: x - half,
      y: y - half,
    });

    // ✅ REAL SCALE (fix alignment issue)
    const scaleX = imgNaturalSize.width / rect.width;
    const scaleY = imgNaturalSize.height / rect.height;

    const bgX =
      x * scaleX * zoomLevel - PANEL_SIZE / 2;

    const bgY =
      y * scaleY * zoomLevel - PANEL_SIZE / 2;

    setBgPosition(`-${bgX}px -${bgY}px`);
  };

  return (
    <div className={`flex ${className}`}>
      {/* IMAGE CONTAINER */}
      <div
        ref={containerRef}
        className="relative w-full h-[420px] overflow-hidden rounded-xl"
        onMouseEnter={() => {
          if (window.innerWidth >= 1024) setShowZoom(true);
        }}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMove}
      >
        {/* MAIN IMAGE */}
        <img
          src={src}
          alt=""
          onLoad={(e) => {
            setImgNaturalSize({
              width: e.target.naturalWidth,
              height: e.target.naturalHeight,
            });
          }}
          className="w-full h-full object-cover select-none"
          draggable={false}
        />

        {/* 🔍 LENS */}
        {showZoom && (
          <div
            className="absolute border border-gray-400 bg-white/30 backdrop-blur-[2px] pointer-events-none"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lens.x,
              top: lens.y,
            }}
          />
        )}
      </div>

      {/* 🧊 ZOOM PANEL */}
      {showZoom && (
        <div
          className="hidden lg:block ml-6 border bg-white shadow-2xl rounded-lg overflow-hidden"
          style={{
            width: PANEL_SIZE,
            height: PANEL_SIZE,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgNaturalSize.width * zoomLevel}px ${imgNaturalSize.height * zoomLevel
              }px`,
            backgroundPosition: bgPosition,
            transition: "background-position 0.08s linear",
          }}
        />
      )}
    </div>
  );
};

export default ZoomControls;