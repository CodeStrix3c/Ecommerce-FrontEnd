import { useState, useRef, useEffect, memo } from "react";
import { usePackagingOptions } from "./hooks/usePackaging";

const S = 240;
const H = S / 2;

const Face = memo(
  ({ transform, pkg, brightness, assembled, xray, isTop, isBottom }) => {
    const styleTransform = assembled
      ? transform
      : `${transform} translateZ(600px) rotateX(-90deg) scale(0.2)`;

    return (
      <div
        className="absolute backface-hidden transition-all duration-[1000ms] cubic-bezier(0.34, 1.56, 0.64, 1)"
        style={{
          width: S,
          height: S,
          transform: styleTransform,
          opacity: xray ? 0.08 : assembled ? 1 : 0,
          backgroundImage: `
          linear-gradient(rgba(0,0,0,${1 - brightness}), rgba(0,0,0,${1 - brightness})), 
          url(${pkg?.img}), 
          url(${pkg?.texture})
        `,
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "inset 0 0 50px rgba(0,0,0,0.1)",
        }}
      >
        {!isBottom && pkg?.ribbon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute w-full h-[30px]"
              style={{ background: pkg.ribbon, opacity: 0.8 }}
            />
            <div
              className="absolute h-full w-[30px]"
              style={{ background: pkg.ribbon, opacity: 0.8 }}
            />
          </div>
        )}
      </div>
    );
  },
);

export default function EcommerceGiftModal({
  isOpen,
  onClose,
  place,
  onSelectPackage,
}) {
  const { data = [], isLoading } = usePackagingOptions();
  const [selId, setSelId] = useState(null);
  const [assemblyStage, setAssemblyStage] = useState(0);
  const [isReveal, setIsReveal] = useState(false);
  const [isAiCrafting, setIsAiCrafting] = useState(false);

  const sceneRef = useRef(null);
  const rotation = useRef({ x: -20, y: 40 });
  const isDragging = useRef(false);

  const PACKS = data.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    ribbon: item.ribbonColor,
    img: item.image,
    texture: item.texture,
    occasion: item.occasion,
    material: item.material || "Premium Matte Fiber",
    padding: item.padding || "Eco-Friendly Kraft Fill",
  }));

  useEffect(() => {
    if (PACKS.length > 0 && !selId) setSelId(PACKS[0].id);
  }, [PACKS]);

  useEffect(() => {
    if (isOpen) {
      setIsAiCrafting(true);
      setAssemblyStage(0);
      const timer = setTimeout(() => {
        setIsAiCrafting(false);
        let stage = 0;
        const interval = setInterval(() => {
          stage++;
          setAssemblyStage(stage);
          if (stage >= 6) clearInterval(interval);
        }, 120);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selId]);

  const handleMouseMove = (e) => {
    if (!isDragging.current || !sceneRef.current) return;
    rotation.current.y += e.movementX * 0.5;
    rotation.current.x -= e.movementY * 0.5;
    sceneRef.current.style.transform = `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
  };

  if (!isOpen) return null;
  const pkg = PACKS.find((p) => p.id === selId);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-[1200px] h-[90vh] bg-white rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
        {/* LEFT SIDEBAR */}
        <aside className="w-full md:w-[380px] border-r border-slate-100 flex flex-col bg-white">
          <div className="p-8 flex-1 overflow-y-auto">
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Packaging Engine
                </span>
              </div>
              <h2 className="text-3xl font-light text-slate-800">
                Gift <span className="font-bold">Finish</span>
              </h2>
            </header>

            <div className="space-y-3">
              {PACKS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelId(p.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    selId === p.id
                      ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                      : "border-slate-50 bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <img
                    src={p.img}
                    className="w-12 h-12 rounded-lg object-cover bg-white"
                  />
                  <div className="text-left flex-1 min-w-0">
                    <p
                      className={`text-[9px] font-bold uppercase ${selId === p.id ? "text-blue-400" : "text-slate-400"}`}
                    >
                      {p.occasion}
                    </p>
                    <p className="font-bold text-sm truncate">{p.name}</p>
                  </div>
                  <span className="font-bold text-sm">₹{p.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Total Price
                </p>
                <p className="text-2xl font-black text-slate-900">
                  ₹{pkg?.price}
                </p>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                Inclusive of all charges
              </p>
            </div>
            <button
              onClick={() => {
                onSelectPackage?.(pkg);
                onClose();
              }}
              className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-xs tracking-widest uppercase hover:bg-black transition-all"
            >
              Confirm Selection
            </button>
          </div>
        </aside>

        <main
          className="flex-1 relative bg-[#fcfcfc] cursor-grab active:cursor-grabbing overflow-hidden"
          onMouseDown={() => (isDragging.current = true)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => (isDragging.current = false)}
        >
          {/* 1. CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 w-10 h-10 bg-white text-slate-400 hover:text-slate-900 hover:border-slate-300 rounded-full flex items-center justify-center shadow-md border border-slate-100 transition-all z-[60]"
          >
            <span className="text-xl leading-none">✕</span>
          </button>

          {/* 2. AI CRAFTING OVERLAY */}
          {isAiCrafting && (
            <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center text-center px-6">
              <div className="w-16 h-16 border-t-2 border-slate-900 rounded-full animate-spin mb-4" />
              <p className="text-slate-900 font-bold text-[10px] uppercase tracking-[5px] animate-pulse">
                Scanning Dimensions
              </p>
            </div>
          )}

          {/* 3. TECHNICAL DATA (Top Right) */}
          <div className="absolute top-28 right-10 z-40 text-right pointer-events-none hidden lg:block">
            <div className="mb-6">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
                Material Analysis
              </p>
              <p className="text-xl font-light text-slate-800 whitespace-nowrap">
                {pkg?.material}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 italic whitespace-nowrap">
                Interior: {pkg?.padding}
              </p>
            </div>
            <div className="space-y-2 opacity-60">
              <div className="h-[1px] w-32 bg-slate-200 ml-auto" />
              <div className="flex flex-col gap-1 font-mono text-[9px] text-slate-500 uppercase">
                <div className="flex justify-between w-40 ml-auto whitespace-nowrap">
                  <span>Integrity:</span> <span>98.4%</span>
                </div>
                <div className="flex justify-between w-40 ml-auto whitespace-nowrap">
                  <span>Eco-Rating:</span> <span>A+</span>
                </div>
                <div className="flex justify-between w-40 ml-auto whitespace-nowrap">
                  <span>System:</span> <span>AI-v3.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. 3D SCENE */}
          <div className="absolute inset-0 flex items-center justify-center perspective-[1200px]">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <div
              ref={sceneRef}
              className="relative w-[240px] h-[240px] preserve-3d transition-transform duration-300 ease-out"
              style={{
                transform: `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-none">
                <img
                  src={place?.photos?.[0]}
                  className="max-w-[65%] max-h-[65%] object-contain"
                  style={{
                    opacity: assemblyStage > 0 ? 1 : 0,
                    mixBlendMode: "multiply",
                    filter:
                      "contrast(1.1) brightness(1.05) drop-shadow(0 15px 25px rgba(0,0,0,0.1))",
                    transform: "translateZ(10px)",
                    transition: "opacity 1s ease",
                  }}
                />
              </div>

              <Face
                pkg={pkg}
                assembled={assemblyStage >= 1}
                xray={isReveal}
                transform={`translateZ(${H}px)`}
                brightness={1}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 2}
                xray={isReveal}
                transform={`translateZ(-${H}px) rotateY(180deg)`}
                brightness={0.7}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 3}
                xray={isReveal}
                transform={`translateX(${H}px) rotateY(90deg)`}
                brightness={0.8}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 4}
                xray={isReveal}
                transform={`translateX(-${H}px) rotateY(-90deg)`}
                brightness={0.8}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 5}
                xray={isReveal}
                transform={`translateY(-${H}px) rotateX(90deg)`}
                brightness={1.1}
                isTop
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 6}
                xray={isReveal}
                transform={`translateY(${H}px) rotateX(-90deg)`}
                brightness={0.5}
                isBottom
              />
            </div>
          </div>

          {/* 5. UNIFIED BOTTOM CONTROL BAR */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl transition-all hover:border-slate-300">
            {/* CLICKABLE BUTTON SECTION */}
            <div className="flex items-center gap-4 px-8 py-5 pointer-events-none">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
                  360° Navigation
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight whitespace-nowrap mt-0.5">
                  Hold left-click & drag to orbit
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-slate-400 opacity-70"
                >
                  <path d="M12 3a9 9 0 1 0 9 9" strokeDasharray="4 2" />
                  <path
                    d="M21 12l-3-3m3 3l-3 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <button
              onClick={() => setIsReveal(!isReveal)}
              className="flex items-center gap-3 px-8 py-5 border-r border-slate-100 hover:bg-slate-50 transition-colors active:scale-95 group"
            >
              <div className="relative">
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${isReveal ? "bg-blue-600" : "bg-slate-300 group-hover:bg-slate-400"}`}
                />
                {isReveal && (
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-40" />
                )}
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-[2px] whitespace-nowrap transition-colors ${isReveal ? "text-blue-600" : "text-slate-500"}`}
              >
                {isReveal ? "Hide Package" : "View Interior"}
              </span>
            </button>

            {/* STATIC INSTRUCTION SECTION */}
          </div>
        </main>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `,
        }}
      />
    </div>
  );
}
