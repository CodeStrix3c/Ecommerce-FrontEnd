import { useState, useRef, useEffect } from "react";

const PACKS = [
  {
    id: "premium",
    name: "Midnight Gold Heritage",
    price: "₹500",
    ribbon: "#D4AF37",
    img: "https://images.unsplash.com/photo-1577083165350-16c9f88b4a26?w=500&q=80",
    texture: "https://www.transparenttextures.com/patterns/black-linen.png",
    accent: "#D4AF37",
  },
  {
    id: "eco",
    name: "Chinar Kraft",
    price: "₹200",
    ribbon: "var(--color-primary)",
    img: "https://images.unsplash.com/photo-1589415112543-98334469601d?w=500&q=80",
    texture: "https://www.transparenttextures.com/patterns/cardboard-flat.png",
    accent: "var(--color-primary)",
  },
  {
    id: "classic",
    name: "Saffron Matte",
    price: "Free",
    ribbon: "var(--color-secondary)",
    img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&q=80",
    texture: "https://www.transparenttextures.com/patterns/paper-fibers.png",
    accent: "var(--color-secondary)",
  },
];

const S = 240;
const H = S / 2;

function Face({
  transform,
  pkg,
  brightness,
  assembled,
  xray,
  isTop = false,
  isBottom = false,
}) {
  const styleTransform = assembled
    ? transform
    : `${transform} translateZ(500px) rotateX(-110deg)`;

  return (
    <div
      className="absolute backface-hidden transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{
        width: S,
        height: S,
        transform: styleTransform,
        opacity: xray ? 0.25 : assembled ? 1 : 0,
        backgroundColor: "var(--color-black)",
        backgroundImage: `url(${pkg.texture}), url(${pkg.img})`,
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        boxShadow: `inset 0 0 80px rgba(0,0,0,${1 - brightness})`,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {!isBottom && (
        <>
          <div
            className="absolute top-1/2 left-0 right-0 h-[34px] -translate-y-1/2 opacity-90 shadow-lg"
            style={{ background: pkg.ribbon }}
          />
          <div
            className="absolute left-1/2 top-0 bottom-0 w-[34px] -translate-x-1/2 opacity-90 shadow-lg"
            style={{ background: pkg.ribbon }}
          />
        </>
      )}
      {isTop && (
        <div
          className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rotate-45 shadow-2xl border border-white/20"
          style={{ background: pkg.ribbon }}
        />
      )}
    </div>
  );
}

export default function EcommerceGiftModal({ isOpen, onClose, place }) {
  console.log(place, "placedetails");

  const [selId, setSelId] = useState("premium");
  const [assemblyStage, setAssemblyStage] = useState(0);
  const [rotation, setRotation] = useState({ x: -25, y: 45 });
  const [isXray, setIsXray] = useState(false);
  const [isAiCrafting, setIsAiCrafting] = useState(false);

  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const pkg = PACKS.find((p) => p.id === selId);

  useEffect(() => {
    if (isOpen) triggerAssembly();
  }, [isOpen, selId]);

  const triggerAssembly = () => {
    setIsAiCrafting(true);
    setAssemblyStage(0);
    setTimeout(() => {
      setIsAiCrafting(false);
      let stage = 0;
      const interval = setInterval(() => {
        stage++;
        setAssemblyStage(stage);
        if (stage >= 6) clearInterval(interval);
      }, 100);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-5 bg-black/60 backdrop-blur-xl">
      <div className="relative w-full max-w-[1150px] h-[85vh] bg-white rounded-[40px] overflow-hidden flex shadow-2xl border border-white/10">
        {/* LEFT PANEL: SELECTION */}
        <div className="w-[380px] flex flex-col border-r border-gray-100 bg-white">
          <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
            <header className="mb-10">
              <span
                className="text-[10px] tracking-[4px] font-black uppercase"
                style={{ color: "var(--color-primary)" }}
              >
                Packaging Studio
              </span>
              <h1
                className="text-3xl font-serif font-bold mt-2"
                style={{ color: "var(--color-black)" }}
              >
                {place?.title || "Artisan Gift Box"}
              </h1>
              <p className="text-lg opacity-60 font-light mt-1">
                ₹{place?.price?.toLocaleString() || "1,250"}
              </p>
            </header>

            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Material Selection
              </h3>
              {PACKS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelId(p.id)}
                  className={`w-full p-5 rounded-2xl text-left transition-all duration-300 border-2 flex justify-between items-center group ${
                    selId === p.id
                      ? "bg-black text-white border-black scale-[1.02]"
                      : "bg-white text-black border-gray-100 hover:border-black/20"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm uppercase tracking-tight">
                      {p.name}
                    </div>
                    <div
                      className={`text-xs mt-1 ${selId === p.id ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {p.price}
                    </div>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ background: p.accent }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART ACTION */}
          <div className="p-10 bg-white border-t border-gray-50">
            <button
              className="w-full py-5 rounded-full font-bold text-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Confirm Selection
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: 3D VIEWER */}
        <div
          onMouseDown={(e) => {
            isDragging.current = true;
            lastMouse.current = { x: e.clientX, y: e.clientY };
          }}
          onMouseMove={(e) => {
            if (!isDragging.current) return;
            const deltaX = e.clientX - lastMouse.current.x;
            const deltaY = e.clientY - lastMouse.current.y;
            setRotation((prev) => ({
              x: prev.x - deltaY * 0.5,
              y: prev.y + deltaX * 0.5,
            }));
            lastMouse.current = { x: e.clientX, y: e.clientY };
          }}
          onMouseUp={() => (isDragging.current = false)}
          className="flex-1 relative perspective-[1500px] overflow-hidden bg-[#f4f4f4]"
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
        >
          {/* Studio Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#e2e2e2_100%)]" />

          {/* AI CRAFTING STATE */}
          {isAiCrafting && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-md">
              <div className="text-center">
                <div
                  className="w-12 h-12 border-4 rounded-full mx-auto mb-4 animate-spin"
                  style={{
                    borderTopColor: "var(--color-primary)",
                    borderColor: "rgba(0,0,0,0.1)",
                  }}
                />
                <p className="text-[10px] tracking-[5px] font-bold text-black uppercase animate-pulse">
                  AI Crafting Textures...
                </p>
              </div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-full h-[2px] bg-white/80 shadow-[0_0_20px_white] absolute animate-scan top-0" />
              </div>
            </div>
          )}

          {/* HUD CONTROLS */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
            <button
              onClick={() => setIsXray(!isXray)}
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-[10px] font-black transition-all shadow-xl border border-white/50 backdrop-blur-sm"
              style={{
                backgroundColor: isXray ? "var(--color-secondary)" : "white",
                color: isXray ? "white" : "var(--color-black)",
              }}
            >
              {isXray ? "SOLID" : "X-RAY"}
            </button>
            <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 shadow-xl">
              <span className="animate-bounce">↓</span>
            </div>
          </div>

          {/* 3D SCENE */}
          <div
            className="w-full h-full preserve-3d"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging.current
                ? "none"
                : "transform 0.8s cubic-bezier(0.1, 0, 0.2, 1)",
            }}
          >
            {/* Ground Reflection Shadow */}
            <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-black/10 rounded-full blur-[60px] -rotate-x-90" />

            {/* Inner Product */}
            <div className="absolute top-1/2 left-1/2 w-40 h-40 -mt-20 -ml-20 translate-z-0">
              <img
                src={
                  place?.photos?.[0] ||
                  "https://images.unsplash.com/photo-1595943529924-c5012f549346?w=500"
                }
                className="w-full h-full object-cover rounded shadow-2xl"
              />
            </div>

            {/* Box Construction */}
            <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -mt-[120px] -ml-[120px] preserve-3d">
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 1}
                xray={isXray}
                transform={`translateZ(${H}px)`}
                brightness={1}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 2}
                xray={isXray}
                transform={`translateZ(-${H}px) rotateY(180deg)`}
                brightness={0.6}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 3}
                xray={isXray}
                transform={`translateX(${H}px) rotateY(90deg)`}
                brightness={0.8}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 4}
                xray={isXray}
                transform={`translateX(-${H}px) rotateY(-90deg)`}
                brightness={0.8}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 5}
                xray={isXray}
                transform={`translateY(-${H}px) rotateX(90deg)`}
                brightness={1.1}
                isTop={true}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 6}
                xray={isXray}
                transform={`translateY(${H}px) rotateX(-90deg)`}
                brightness={0.4}
                isBottom={true}
              />
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg shadow-xl hover:bg-gray-50 transition-colors"
          >
            ✕
          </button>

          <div className="absolute bottom-8 w-full text-center text-[10px] tracking-[4px] font-bold text-black/30">
            DRAG TO ROTATE 360° • STUDIO VIEW
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-scan { animation: scan 2s linear infinite; }
      `,
        }}
      />
    </div>
  );
}
