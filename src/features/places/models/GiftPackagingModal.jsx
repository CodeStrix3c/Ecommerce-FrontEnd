import { useState, useRef, useEffect, memo } from "react";

/** * PACKS CONFIGURATION */
const PACKS = [
  {
    id: "wedding",
    name: "Royal Nikah Velvet",
    price: "850",
    ribbon: "#FFD700", // Gold
    img: "https://i.etsystatic.com/46240082/r/il/2cb0ad/6048710508/il_800x800.6048710508_gp9t.jpg",
    texture: "https://www.transparenttextures.com/patterns/natural-paper.png",
    accent: "#b22222",
    occasion: "Wedding & Nikah",
  },
  {
    id: "gift",
    name: "Classic Heritage Teal",
    price: "450",
    ribbon: "#f3f4f6", // Silver
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80",
    texture:
      "https://www.transparenttextures.com/patterns/fabric-of-squares.png",
    accent: "#008080",
    occasion: "General Gifting",
  },
  {
    id: "birthday",
    name: "Festive Chinar Red",
    price: "350",
    ribbon: "#ffffff",
    img: "https://i.etsystatic.com/15513349/r/il/85510b/5975739618/il_1588xN.5975739618_rit2.jpg",
    texture: "https://www.transparenttextures.com/patterns/pinstripe.png",
    accent: "#e63946",
    occasion: "Birthday Special",
  },
  {
    id: "anniversary",
    name: "Midnight Rose Gold",
    price: "600",
    ribbon: "#E0B0FF", // Mauve
    img: "https://images.unsplash.com/photo-1577083165350-16c9f88b4a26?w=500&q=80",
    texture: "https://www.transparenttextures.com/patterns/black-linen.png",
    accent: "#D4AF37",
    occasion: "Anniversary & VIP",
  },
];

const S = 240; // Box Size
const H = S / 2;

const Face = memo(
  ({ transform, pkg, brightness, assembled, xray, isTop, isBottom }) => {
    const styleTransform = assembled
      ? transform
      : `${transform} translateZ(800px) rotateX(-180deg) scale(0.5)`;

    return (
      <div
        className="absolute backface-hidden transition-all duration-[1200ms] ease-out overflow-hidden"
        style={{
          width: S,
          height: S,
          transform: styleTransform,
          opacity: xray ? 0.15 : assembled ? 1 : 0,
          // backgroundColor: pkg.accent || "#111",
          backgroundImage: `
          linear-gradient(rgba(0,0,0,${1 - brightness}), rgba(0,0,0,${1 - brightness})), 
          url(${pkg.img}), 
          url(${pkg.texture})
        `,
          backgroundSize: "cover, cover, auto",
          backgroundBlendMode: "multiply",
          border: "1px solid rgba(255,255,255,0.1)",
          willChange: "transform, opacity",
        }}
      >
        {/* RIBBON LAYER */}
        {!isBottom && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div
              className="absolute w-full h-[40px] opacity-90 shadow-sm"
              style={{ background: pkg.ribbon }}
            />
            <div
              className="absolute h-full w-[40px] opacity-90 shadow-sm"
              style={{ background: pkg.ribbon }}
            />
          </div>
        )}

        {/* TOP BOX BOW */}
        {isTop && (
          <div
            className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-white/30 flex items-center justify-center z-20 shadow-lg"
            style={{ background: pkg.ribbon }}
          >
            <div className="w-px h-full bg-black/10 absolute rotate-90" />
            <div className="w-px h-full bg-black/10 absolute" />
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
  const [selId, setSelId] = useState("wedding");
  const [assemblyStage, setAssemblyStage] = useState(0);
  const [isPeekInside, setIsPeekInside] = useState(false);
  const [isAiCrafting, setIsAiCrafting] = useState(false);

  // Find the full package object

  const sceneRef = useRef(null);
  const rotationRef = useRef({ x: -20, y: 40 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const requestRef = useRef();

  const pkg = PACKS.find((p) => p.id === selId);

  const handleConfirm = () => {
    if (onSelectPackage) {
      onSelectPackage(pkg); // Send the whole object back
    }
    onClose(); // Close the modal
  };

  const updateSceneTransform = () => {
    if (sceneRef.current) {
      sceneRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
    }
  };

  const animate = () => {
    if (!isDragging.current) {
      rotationRef.current.x += velocityRef.current.x;
      rotationRef.current.y += velocityRef.current.y;
      velocityRef.current.x *= 0.95;
      velocityRef.current.y *= 0.95;
      updateSceneTransform();
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
        }, 150);
      }, 1500);
    }
  }, [isOpen, selId]);

  if (!isOpen) return null;

  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    velocityRef.current = { x: -dy * 0.05, y: dx * 0.05 };
    rotationRef.current.x -= dy * 0.5;
    rotationRef.current.y += dx * 0.5;
    updateSceneTransform();
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl transition-opacity">
      <div className="relative w-full max-w-[1200px] h-[85vh] bg-white rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
        {/* LEFT SIDEBAR */}
        <aside className="w-full md:w-[380px] flex flex-col border-r border-gray-100 bg-white z-20">
          <div className="flex-1 overflow-y-auto p-8">
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-2 text-amber-600 font-bold text-[10px] uppercase tracking-[3px]">
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                Artisanal Wrapping
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 leading-tight">
                {place?.title || "Kashmiri Masterpiece"}
              </h2>
            </header>
            <div className="space-y-3">
              {PACKS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelId(p.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all border-2 flex items-center gap-4 ${
                    selId === p.id
                      ? "border-black bg-black text-white shadow-xl"
                      : "border-gray-50 bg-gray-50 hover:border-gray-200 text-gray-900"
                  }`}
                >
                  <img
                    src={p.img}
                    className="w-14 h-14 rounded-xl object-cover"
                    alt={p.name}
                  />

                  <div className="flex-1">
                    <p
                      className={`text-[9px] font-bold uppercase tracking-wider ${
                        selId === p.id ? "text-amber-400" : "text-gray-400"
                      }`}
                    >
                      {p.occasion}
                    </p>
                    <p className="font-bold text-sm leading-tight">{p.name}</p>
                  </div>

                  {/* PRICE TAG */}
                  <div className="text-right">
                    <p
                      className={`text-xs font-black ${
                        selId === p.id ? "text-white" : "text-gray-900"
                      }`}
                    >
                      +₹{p.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 border-t border-gray-50 bg-gray-50/50">
            <button
              onClick={handleConfirm} // Call the selection handler
              className="w-full py-4 rounded-full font-bold text-[11px] uppercase tracking-[2px] bg-black text-white hover:bg-amber-800 transition-all shadow-lg active:scale-95"
            >
              Confirm & Update Selection
            </button>
          </div>
        </aside>

        {/* RIGHT SIDE: 3D VIEWPORT */}
        <main
          className="flex-1 relative bg-[#fafafa] overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => (isDragging.current = false)}
          onMouseLeave={() => (isDragging.current = false)}
        >
          {isAiCrafting && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-black border-t-amber-500 rounded-full animate-spin" />
                <p className="text-[11px] font-black uppercase tracking-[5px] text-black animate-pulse">
                  AI is Crafting...
                </p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center perspective-[1500px]">
            <div
              ref={sceneRef}
              className="relative w-[240px] h-[240px] preserve-3d"
            >
              {/* Product inside */}
              <div className="absolute inset-8 preserve-3d flex items-center justify-center">
                <img
                  src="https://www.hamiast.com/cdn/shop/files/Kandkaari_Copper_Craft_Glass_-_Hand_Engraved_Kashmiri_Artisanal_Piece_-_Hamiast-61689_1680x.jpg?v=1740486501"
                  className="w-full h-full object-contain pointer-events-none"
                  style={{
                    opacity: assemblyStage > 0 ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                    mixBlendMode: "multiply",
                    filter:
                      "contrast(1.1) brightness(1.05) drop-shadow(0 15px 30px rgba(0,0,0,0.3))",
                    transform: "translateZ(10px) scale(0.85)",
                  }}
                  alt="Gift Item"
                />
              </div>

              {/* Box Faces */}
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 1}
                xray={isPeekInside}
                transform={`translateZ(${H}px)`}
                brightness={1}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 2}
                xray={isPeekInside}
                transform={`translateZ(-${H}px) rotateY(180deg)`}
                brightness={0.6}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 3}
                xray={isPeekInside}
                transform={`translateX(${H}px) rotateY(90deg)`}
                brightness={0.8}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 4}
                xray={isPeekInside}
                transform={`translateX(-${H}px) rotateY(-90deg)`}
                brightness={0.8}
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 5}
                xray={isPeekInside}
                transform={`translateY(-${H}px) rotateX(90deg)`}
                brightness={1.1}
                isTop
              />
              <Face
                pkg={pkg}
                assembled={assemblyStage >= 6}
                xray={isPeekInside}
                transform={`translateY(${H}px) rotateX(-90deg)`}
                brightness={0.4}
                isBottom
              />
            </div>
          </div>

          {/* VIEWPORT CONTROLS */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30">
            <div className="px-5 py-2 bg-white/90 backdrop-blur border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
              360° Interaction
            </div>
            <button
              onClick={() => setIsPeekInside(!isPeekInside)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${
                isPeekInside
                  ? "bg-amber-600 text-white"
                  : "bg-white text-black hover:bg-gray-50 border border-gray-100"
              }`}
            >
              {isPeekInside ? "Hide Product" : "Peek Inside"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl z-50 group hover:bg-black transition-colors"
          >
            <span className="text-xl group-hover:text-white transition-transform group-hover:rotate-90">
              ✕
            </span>
          </button>
        </main>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `.preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; }`,
        }}
      />
    </div>
  );
}
