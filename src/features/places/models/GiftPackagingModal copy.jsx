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
        {!isBottom && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute w-full h-[30px]"
              style={{ background: pkg?.ribbon, opacity: 0.8 }}
            />
            <div
              className="absolute h-full w-[30px]"
              style={{ background: pkg?.ribbon, opacity: 0.8 }}
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
  currentSelection,
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
        }, 100);
      }, 1200);
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[var(--color-overlay)] backdrop-blur-sm">
      <div className="relative w-full max-w-[1100px] h-[85vh] bg-[var(--color-white)] rounded-[24px] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-[var(--color-gray)]">
        {/* Sidebar */}
        <aside className="w-full md:w-[360px] border-r border-[var(--color-gray)] flex flex-col bg-white">
          <div className="p-8 flex-1 overflow-y-auto">
            <h2 className="text-[var(--color-black)] text-2xl font-bold mb-6 tracking-tight whitespace-nowrap">
              Premium Packaging
            </h2>
            <div className="space-y-3">
              {PACKS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelId(p.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    selId === p.id
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-transparent bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={p.img}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase opacity-60 whitespace-nowrap">
                      {p.occasion}
                    </p>
                    <p className="font-bold text-sm whitespace-nowrap truncate">
                      {p.name}
                    </p>
                  </div>
                  <span className="font-black text-sm whitespace-nowrap">
                    +₹{p.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="p-8 bg-gray-50">
            <button
              onClick={() => {
                onSelectPackage?.(pkg);
                onClose();
              }}
              className="w-full py-4 rounded-full bg-[var(--color-primary)] text-white font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-primary-hover)] active:scale-95 transition-all"
            >
              Confirm Selection
            </button>
          </div>
        </aside>

        {/* 3D Canvas */}
        <main
          className="flex-1 relative bg-[#f8f9fa] cursor-grab active:cursor-grabbing overflow-hidden"
          onMouseDown={() => (isDragging.current = true)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => (isDragging.current = false)}
        >
          {isAiCrafting && (
            <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[var(--color-black)] font-black text-[10px] uppercase tracking-[4px]">
                Crafting Box...
              </p>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center perspective-[1200px]">
            <div
              ref={sceneRef}
              className="relative w-[240px] h-[240px] preserve-3d transition-transform duration-150 ease-out"
              style={{
                transform: `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`,
              }}
            >
              {/* The Product: Background Removal using Multiply Blend */}
              <div className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-none">
                <img
                  src={place?.photos?.[0]}
                  className="max-w-[70%] max-h-[70%] object-contain"
                  style={{
                    opacity: assemblyStage > 0 ? 1 : 0,
                    mixBlendMode: "multiply", // Removes white background
                    filter:
                      "contrast(1.2) brightness(1.1) drop-shadow(0 20px 30px rgba(0,0,0,0.2))",
                    transform: "translateZ(10px)",
                    transition: "opacity 0.8s ease",
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

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-40">
            <button
              onClick={() => setIsReveal(!isReveal)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${
                isReveal
                  ? "bg-[var(--color-secondary)] text-white"
                  : "bg-white text-[var(--color-black)] border border-[var(--color-gray)]"
              }`}
            >
              {isReveal ? "Hide Package" : "View Interior"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--color-black)] hover:text-white transition-colors z-50"
          >
            ✕
          </button>
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
