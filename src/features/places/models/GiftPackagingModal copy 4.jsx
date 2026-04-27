import { useState, useRef, useEffect } from "react";

// Added specific occasion metadata
const PACKS = [
  {
    id: "wedding",
    name: "Royal Wedding Velvet",
    price: "₹850",
    ribbon: "#FFD700",
    img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&q=80",
    texture: "https://www.transparenttextures.com/patterns/natural-paper.png",
    accent: "#b22222",
    occasion: "Marriage & Nikah",
  },
  {
    id: "premium",
    name: "Midnight Gold Heritage",
    price: "₹500",
    ribbon: "#D4AF37",
    img: "https://images.unsplash.com/photo-1577083165350-16c9f88b4a26?w=500&q=80",
    texture: "https://www.transparenttextures.com/patterns/black-linen.png",
    accent: "#D4AF37",
    occasion: "Anniversary & VIP",
  },
  {
    id: "eco",
    name: "Chinar Kraft",
    price: "₹200",
    ribbon: "#2d5a27",
    img: "https://images.unsplash.com/photo-1589415112543-98334469601d?w=500&q=80",
    texture: "https://www.transparenttextures.com/patterns/cardboard-flat.png",
    accent: "#4a7c44",
    occasion: "Sustainable Choice",
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
  // Enhanced "Flight" animation for the box pieces
  const styleTransform = assembled
    ? transform
    : `${transform} translateZ(800px) rotateX(-180deg) scale(0.5)`;

  return (
    <div
      className="absolute backface-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        width: S,
        height: S,
        transform: styleTransform,
        opacity: xray ? 0.15 : assembled ? 1 : 0,
        backgroundColor: "#111",
        backgroundImage: `url(${pkg.texture}), url(${pkg.img})`,
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        boxShadow: `inset 0 0 100px rgba(0,0,0,${1 - brightness})`,
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      {!isBottom && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute w-full h-[45px] opacity-90 shadow-2xl"
            style={{ background: pkg.ribbon }}
          />
          <div
            className="absolute h-full w-[45px] opacity-90 shadow-2xl"
            style={{ background: pkg.ribbon }}
          />
        </div>
      )}
      {isTop && (
        <div
          className="absolute top-1/2 left-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 rotate-45 shadow-2xl border border-white/30 flex items-center justify-center"
          style={{ background: pkg.ribbon }}
        >
          <div className="w-1 h-full bg-black/10 absolute rotate-90" />
          <div className="w-1 h-full bg-black/10 absolute" />
        </div>
      )}
    </div>
  );
}

export default function EcommerceGiftModal({ isOpen, onClose, place }) {
  const [selId, setSelId] = useState("premium");
  const [assemblyStage, setAssemblyStage] = useState(0);
  const [rotation, setRotation] = useState({ x: -20, y: 40 });
  const [isXray, setIsXray] = useState(false);
  const [isAiCrafting, setIsAiCrafting] = useState(false);

  // Rotation & Physics Refs
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const requestRef = useRef();

  const pkg = PACKS.find((p) => p.id === selId);

  // Inertia Animation Loop
  const animate = () => {
    if (!isDragging.current) {
      setRotation((prev) => ({
        x: prev.x + velocity.current.x,
        y: prev.y + velocity.current.y,
      }));
      // Friction: Slow down the rotation gradually
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsAiCrafting(true);
      setAssemblyStage(0);
      setTimeout(() => {
        setIsAiCrafting(false);
        let stage = 0;
        const interval = setInterval(() => {
          stage++;
          setAssemblyStage(stage);
          if (stage >= 6) clearInterval(interval);
        }, 120);
      }, 1400);
    }
  }, [isOpen, selId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-[1350px] h-full max-h-[880px] bg-[#ffffff] rounded-[48px] overflow-hidden flex flex-col md:flex-row shadow-[0_0_120px_rgba(0,0,0,0.6)] border border-white/20">
        {/* LEFT SIDEBAR: ARTISAN SPECS */}
        <div className="w-full md:w-[450px] flex flex-col border-r border-gray-100 bg-white shadow-2xl z-10">
          <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] tracking-[4px] font-black text-gray-400 uppercase">
                  AI Studio Live
                </span>
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tight">
                {place?.title}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-2xl font-light text-amber-600">
                  ₹{place?.price}
                </span>
                <span className="text-sm line-through text-gray-300">
                  ₹{place?.oldPrice}
                </span>
                <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded font-bold">
                  -{place?.discount}% OFF
                </span>
              </div>
            </div>

            {/* AI Analysis Box */}
            <div className="p-6 bg-zinc-900 rounded-[32px] text-white mb-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                </svg>
              </div>
              <h3 className="text-[10px] font-black tracking-widest text-amber-400 uppercase mb-3">
                Material Analysis
              </h3>
              <div
                className="text-xs leading-relaxed opacity-80 mb-4"
                dangerouslySetInnerHTML={{ __html: place?.description }}
              />
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[9px] text-white/40 uppercase">
                    Authenticity
                  </p>
                  <p className="text-sm font-bold">Kashmir Heritage</p>
                </div>
                <div>
                  <p className="text-[9px] text-white/40 uppercase">Weight</p>
                  <p className="text-sm font-bold">
                    {place?.weight || "Standard"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-[3px] text-gray-400 uppercase px-1">
                Curated Themes
              </h3>
              {PACKS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelId(p.id)}
                  className={`w-full p-5 rounded-[24px] text-left transition-all border-2 flex items-center gap-5 ${
                    selId === p.id
                      ? "border-black bg-black text-white shadow-2xl translate-x-2"
                      : "border-gray-50 bg-gray-50/50 hover:border-gray-200"
                  }`}
                >
                  <img
                    src={p.img}
                    className="w-14 h-14 rounded-2xl object-cover shadow-lg border border-white/20"
                  />
                  <div className="flex-1">
                    <p
                      className={`text-[9px] font-black uppercase tracking-widest ${selId === p.id ? "text-amber-400" : "text-gray-400"}`}
                    >
                      {p.occasion}
                    </p>
                    <p className="font-bold text-sm tracking-tight">{p.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">{p.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-10 bg-white border-t border-gray-50">
            <button className="w-full py-6 rounded-full font-black text-xs uppercase tracking-[3px] bg-black text-white hover:bg-amber-600 transition-all shadow-2xl active:scale-95">
              Confirm & Gift Now
            </button>
          </div>
        </div>

        {/* RIGHT: INTERACTIVE 3D ENGINE */}
        <div
          onMouseDown={(e) => {
            isDragging.current = true;
            lastMouse.current = { x: e.clientX, y: e.clientY };
            velocity.current = { x: 0, y: 0 };
          }}
          onMouseMove={(e) => {
            if (!isDragging.current) return;
            const dx = e.clientX - lastMouse.current.x;
            const dy = e.clientY - lastMouse.current.y;

            // Apply rotation and store velocity
            velocity.current = { x: -dy * 0.1, y: dx * 0.1 };
            setRotation((prev) => ({
              x: prev.x - dy * 0.5,
              y: prev.y + dx * 0.5,
            }));
            lastMouse.current = { x: e.clientX, y: e.clientY };
          }}
          onMouseUp={() => (isDragging.current = false)}
          className="flex-1 relative perspective-[2000px] bg-[#fdfdfd] overflow-hidden"
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
        >
          {/* AI SCRAFTING OVERLAY */}
          {isAiCrafting && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-2xl">
              <div className="relative">
                <div className="w-32 h-32 border-[1px] border-black/10 rounded-full animate-[spin_4s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[10px] font-black tracking-[5px] uppercase animate-pulse">
                    Scanning...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3D SCENE */}
          <div
            className="w-full h-full preserve-3d"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging.current ? "none" : "transform 0.1s linear",
            }}
          >
            {/* Ground Shadows */}
            <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-black/5 rounded-full blur-[100px] -rotate-x-90" />

            {/* Inner Product */}
            <div className="absolute top-1/2 left-1/2 w-48 h-48 -mt-24 -ml-24 preserve-3d">
              <img
                src={place?.photos?.[0]}
                className="w-full h-full object-cover rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.2)]"
                style={{ opacity: assemblyStage > 0 ? 1 : 0 }}
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
                isTop
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 6}
                xray={isXray}
                transform={`translateY(${H}px) rotateX(-90deg)`}
                brightness={0.4}
                isBottom
              />
            </div>
          </div>

          {/* HUD & CONTROLS */}
          <div className="absolute bottom-10 left-10 flex gap-4 items-center z-20">
            <div className="px-4 py-2 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl">
              360° Studio Mode
            </div>
            <button
              onClick={() => setIsXray(!isXray)}
              className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${isXray ? "bg-amber-600 text-white" : "bg-white text-black border-gray-200 shadow-xl"}`}
            >
              {isXray ? "Disable X-Ray" : "Toggle X-Ray View"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-10 right-10 w-14 h-14 bg-white hover:bg-black hover:text-white rounded-full flex items-center justify-center text-xl shadow-2xl transition-all z-50"
          >
            ✕
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes scanline {
          0% { transform: translateY(-200px); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(200px); opacity: 0; }
        }
      `,
        }}
      />
    </div>
  );
}
