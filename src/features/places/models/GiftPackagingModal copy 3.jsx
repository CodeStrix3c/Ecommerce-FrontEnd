import { useState, useRef, useEffect } from "react";

// --- Constants & Config ---
const PACKS = [
  {
    id: "birthday",
    name: "Birthday",
    emoji: "🎂",
    ribbon: "#FF1493",
    tag: "Happy Birthday!",
    accent: "#C91070",
    img: "/assets/images/gifts/birthday.png",
  },
  {
    id: "wedding",
    name: "Wedding",
    emoji: "💍",
    ribbon: "#C9A84C",
    tag: "With Love & Blessings",
    accent: "#A07830",
    img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80",
  },
  {
    id: "gift",
    name: "Classic Gift",
    emoji: "🎁",
    ribbon: "#FFD600",
    tag: "A Special Gift",
    accent: "#6a1090",
    img: "https://images.unsplash.com/photo-1513712160168-52a35e0e8be2?w=400&q=80",
  },
];

const S = 180;
const H = S / 2;

// --- 3D Physical Ribbon Component ---
function RealRibbon({ color, horizontal = true }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: horizontal ? "100%" : "26px",
          height: horizontal ? "26px" : "100%",
          background: color,
          boxShadow:
            "0 0 10px rgba(0,0,0,0.3), inset 0 0 5px rgba(255,255,255,0.2)",
          zIndex: 10,
          // Texture effect
          backgroundImage:
            "linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.05) 50%)",
          backgroundSize: "2px 100%",
        }}
      />
    </div>
  );
}

function Face({
  transform,
  imgSrc,
  brightness,
  ribbon,
  assembled,
  xray,
  isTop = false,
}) {
  const styleTransform = assembled
    ? transform
    : `${transform} translateZ(600px) rotateX(90deg) scale(0.1)`;

  return (
    <div
      style={{
        position: "absolute",
        width: S,
        height: S,
        backfaceVisibility: "hidden",
        transition: "all 0.9s cubic-bezier(0.19, 1, 0.22, 1)",
        transform: styleTransform,
        opacity: xray ? 0.15 : assembled ? 1 : 0,
        zIndex: assembled ? 5 : 0,
        background: "#222",
        overflow: "hidden",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
      }}
    >
      <img
        src={imgSrc}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `brightness(${brightness})`,
        }}
      />

      {/* Ribbons wrapped around all sides */}
      <RealRibbon color={ribbon} horizontal={true} />
      <RealRibbon color={ribbon} horizontal={false} />

      {/* Top Bow Simulation if it's the top face */}
      {isTop && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "50px",
            height: "50px",
            background: ribbon,
            borderRadius: "2px",
            transform: "translate(-50%, -50%) rotate(45deg)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
            zIndex: 11,
          }}
        />
      )}
    </div>
  );
}

export default function GiftPackagingModal({ isOpen, onClose }) {
  const [selId, setSelId] = useState("gift");
  const [isBooting, setIsBooting] = useState(true);
  const [assemblyStage, setAssemblyStage] = useState(0);
  const [rotation, setRotation] = useState({ x: -20, y: 45 });
  const [isXray, setIsXray] = useState(false);

  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const pkg = PACKS.find((p) => p.id === selId);

  const startSequence = () => {
    setIsBooting(true);
    setAssemblyStage(0);

    // AI Initialization Delay
    setTimeout(() => {
      setIsBooting(false);
      let stage = 0;
      const interval = setInterval(() => {
        stage++;
        setAssemblyStage(stage);
        if (stage >= 6) clearInterval(interval);
      }, 250);
    }, 2000);
  };

  useEffect(() => {
    if (isOpen) startSequence();
  }, [isOpen, selId]);

  const onMouseDown = (e) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMouse.current.x;
    const deltaY = e.clientY - lastMouse.current.y;
    setRotation((prev) => ({
      x: prev.x - deltaY * 0.4,
      y: prev.y + deltaX * 0.4,
    }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const endDrag = () => (isDragging.current = false);
    window.addEventListener("mouseup", endDrag);
    return () => window.removeEventListener("mouseup", endDrag);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
        .boot-text { font-family: monospace; color: #a060ff; text-shadow: 0 0 10px #a060ff; }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(2,0,5,0.98)",
          backdropFilter: "blur(20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#050208",
            width: "95%",
            maxWidth: "1100px",
            height: "750px",
            borderRadius: "40px",
            border: "1px solid #442277",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: "240px",
              padding: "40px 30px",
              borderRight: "1px solid #221133",
              background: "#08040c",
            }}
          >
            <h2
              className="boot-text"
              style={{ fontSize: "14px", marginBottom: "30px" }}
            >
              [ AI POWERED PACKAGING ]
            </h2>
            {PACKS.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelId(p.id)}
                style={{
                  padding: "15px",
                  marginBottom: "12px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background: selId === p.id ? "#1a0d26" : "transparent",
                  color: selId === p.id ? "#fff" : "#554466",
                  border: `1px solid ${selId === p.id ? "#a060ff" : "transparent"}`,
                  transition: "0.4s",
                  fontSize: "14px",
                }}
              >
                {p.emoji} {p.name}
              </div>
            ))}

            <div
              style={{
                marginTop: "50px",
                padding: "20px",
                border: "1px dashed #442277",
                borderRadius: "15px",
              }}
            >
              <div className="boot-text" style={{ fontSize: "10px" }}>
                MOD_TYPE: X-RAY_VIEW
              </div>
              <input
                type="checkbox"
                checked={isXray}
                onChange={() => setIsXray(!isXray)}
                style={{ marginTop: "10px" }}
              />
            </div>
          </div>

          {/* Main Viewport */}
          <div
            className="scene-container"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            style={{
              flex: 1,
              position: "relative",
              overflow: "hidden",
              perspective: "1500px",
            }}
          >
            {isBooting ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 20,
                  background: "#050208",
                }}
              >
                <div
                  className="boot-text"
                  style={{ fontSize: "18px", animation: "pulse 1s infinite" }}
                >
                  INITIALIZING AI WRAPPING...
                </div>
                <div
                  style={{
                    width: "300px",
                    height: "2px",
                    background: "#221133",
                    marginTop: "20px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      height: "100%",
                      background: "#a060ff",
                      width: "60%",
                      boxShadow: "0 0 15px #a060ff",
                    }}
                  />
                </div>
              </div>
            ) : null}

            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: isDragging.current
                  ? "none"
                  : "transform 0.2s ease-out",
              }}
            >
              {/* Product */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "110px",
                  height: "110px",
                  margin: "-55px",
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={pkg.img}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "15px",
                    boxShadow: "0 0 40px rgba(160,96,255,0.4)",
                  }}
                />
              </div>

              {/* 3D Box Construction */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: S,
                  height: S,
                  margin: `-${H}px`,
                  transformStyle: "preserve-3d",
                }}
              >
                <Face
                  assembled={assemblyStage >= 1}
                  xray={isXray}
                  transform={`translateZ(${H}px)`}
                  imgSrc={pkg.img}
                  ribbon={pkg.ribbon}
                  brightness={1}
                />
                <Face
                  assembled={assemblyStage >= 2}
                  xray={isXray}
                  transform={`translateZ(-${H}px) rotateY(180deg)`}
                  imgSrc={pkg.img}
                  ribbon={pkg.ribbon}
                  brightness={0.6}
                />
                <Face
                  assembled={assemblyStage >= 3}
                  xray={isXray}
                  transform={`translateX(${H}px) rotateY(90deg)`}
                  imgSrc={pkg.img}
                  ribbon={pkg.ribbon}
                  brightness={0.8}
                />
                <Face
                  assembled={assemblyStage >= 4}
                  xray={isXray}
                  transform={`translateX(-${H}px) rotateY(-90deg)`}
                  imgSrc={pkg.img}
                  ribbon={pkg.ribbon}
                  brightness={0.8}
                />
                <Face
                  assembled={assemblyStage >= 5}
                  xray={isXray}
                  transform={`translateY(-${H}px) rotateX(90deg)`}
                  imgSrc={pkg.img}
                  ribbon={pkg.ribbon}
                  brightness={1}
                  isTop={true}
                />
                <Face
                  assembled={assemblyStage >= 6}
                  xray={isXray}
                  transform={`translateY(${H}px) rotateX(-90deg)`}
                  imgSrc={pkg.img}
                  ribbon={pkg.ribbon}
                  brightness={0.4}
                />
              </div>

              {/* Floor */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "1200px",
                  height: "1200px",
                  margin: "-600px",
                  backgroundImage:
                    "radial-gradient(circle, #1a0b2e 0%, transparent 80%), linear-gradient(#221435 1px, transparent 1px), linear-gradient(90deg, #221435 1px, transparent 1px)",
                  backgroundSize: "100% 100%, 60px 60px, 60px 60px",
                  transform: "rotateX(90deg) translateZ(-250px)",
                  opacity: 0.4,
                }}
              />
            </div>

            <div
              className="boot-text"
              style={{
                position: "absolute",
                bottom: 30,
                right: 30,
                fontSize: "10px",
                textAlign: "right",
                pointerEvents: "none",
              }}
            >
              ROT_X: {Math.round(rotation.x)} | ROT_Y: {Math.round(rotation.y)}{" "}
              <br />
              RENDERING_ENGINE: V3_PACK <br />
              HOLD AND MOVE MOUSE TO ROTATE
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 30,
              right: 30,
              background: "none",
              border: "none",
              color: "#554466",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
