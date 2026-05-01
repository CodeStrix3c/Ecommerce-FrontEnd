import React, { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Shirt,
  Sparkles,
  Upload,
  Warehouse,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { FaWandSparkles } from "react-icons/fa6";

/* ---------------- API Import ---------------- */
import {
  generateGarmentTryOn,
  generateRoomTryOn,
  toAbsoluteApiUrl,
} from "./api/api.js";

const initialGarmentForm = {
  humanImage: null,
  garmentImage: null,
  style: "casual",
  category: "shirt",
};
const initialRoomForm = {
  roomPhoto: null,
  itemPhoto: null,
  category: "rug",
  placement: "center of the room",
};

/* ---------------- Utility Hooks ---------------- */
function useObjectUrl(file) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!file) {
      setUrl("");
      return;
    }
    const nextUrl = URL.createObjectURL(file);
    setUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [file]);
  return url;
}

/* ---------------- UI Components ---------------- */

function FilePicker({ id, label, hint, file, onChange }) {
  const previewUrl = useObjectUrl(file);

  return (
    <div className="relative group w-full">
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center w-full aspect-square md:aspect-auto md:h-56 border-2 border-dashed border-[var(--color-gray)] rounded-3xl cursor-pointer bg-white hover:border-[var(--color-primary)] transition-all duration-500 overflow-hidden relative"
      >
        <input
          id={id}
          type="file"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />

        {previewUrl ? (
          <div className="relative w-full h-full group">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[var(--color-black)]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="text-white" size={24} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="p-4 bg-[var(--color-gray)] rounded-2xl mb-3 group-hover:bg-[var(--color-primary)]/10 group-hover:text-[var(--color-primary)] transition-colors duration-300">
              <ImagePlus size={28} className="opacity-70" />
            </div>
            <p className="text-[11px] font-black text-[var(--color-black)] uppercase tracking-[0.1em]">
              {label}
            </p>
            <p className="text-[10px] text-gray-400 mt-1 uppercase italic">
              {hint}
            </p>
          </div>
        )}

        <div className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg border border-[var(--color-gray)] opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          <Upload size={14} className="text-[var(--color-primary)]" />
        </div>
      </label>
    </div>
  );
}

function ResultPanel({ result, imageKey, title }) {
  const imageUrl = toAbsoluteApiUrl(result?.[imageKey]);

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] lg:h-full border-2 border-dashed border-[var(--color-gray)] rounded-[2.5rem] bg-gray-50/50 text-center p-10">
        <div className="w-16 h-16 bg-[var(--color-secondary)] rounded-2xl shadow-sm flex items-center justify-center mb-6 text-[var(--color-white)] border border-[var(--color-gray)]">
          <FaWandSparkles size={32} className="opacity-40" />
        </div>
        <h2 className="text-xl font-black text-[var(--color-black)] uppercase tracking-tighter">
          Ready for Render
        </h2>
        <p className="text-gray-400 max-w-xs text-[10px] mt-3 leading-relaxed uppercase tracking-widest font-bold">
          Upload your assets and click "Render" to visualize your
          transformation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-[var(--color-gray)] sticky top-28">
      <div className="p-6 border-b border-[var(--color-gray)] flex items-center justify-between bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--color-primary)] p-2 rounded-xl text-white shadow-lg shadow-[var(--color-primary)]/20">
            <CheckCircle2 size={20} />
          </div>
          <h2 className="font-black text-[var(--color-black)] uppercase tracking-tight text-sm">
            {title}
          </h2>
        </div>
        <a
          href={imageUrl}
          download
          style={{ backgroundColor: "var(--color-black)" }}
          className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl transition-all duration-300 font-black text-[10px] uppercase tracking-widest hover:opacity-90 active:scale-95 group"
        >
          <span>Save Image</span>
          <ArrowDownToLine
            size={16}
            className="group-hover:translate-y-0.5 transition-transform"
          />
        </a>
      </div>

      <div className="p-4 md:p-8">
        <div className="rounded-2xl overflow-hidden shadow-inner border border-[var(--color-gray)] bg-gray-50">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--color-gray)] rounded-2xl border border-black/5">
            <p className="text-[9px] uppercase font-black text-[var(--color-black)] opacity-40 mb-1">
              Process ID
            </p>
            <p className="text-[11px] font-mono text-[var(--color-black)] font-bold truncate">
              {result.requestId}
            </p>
          </div>
          <div className="p-4 bg-[var(--color-primary)]/5 rounded-2xl border border-[var(--color-primary)]/10">
            <p className="text-[9px] uppercase font-black text-[var(--color-primary)] mb-1">
              Status
            </p>
            <p className="text-[11px] font-black text-[var(--color-primary)] uppercase tracking-widest">
              {result.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Main Layout ---------------- */

export default function TryOn() {
  const [activeMode, setActiveMode] = useState("garment");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[var(--color-black)] font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <header className="bg-white/80 backdrop-blur-xl border-b border-[var(--color-gray)] px-6 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-secondary)] rounded-xl flex items-center justify-center">
              <FaWandSparkles className="text-white" size={20} />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-black tracking-tighter uppercase leading-none">
                AI <span className="text-[var(--color-primary)]">Try-on</span>
              </h1>
              <p className="text-[8px] font-black tracking-[0.4em] text-gray-400 uppercase mt-1">
                Next-Gen Visual Engine
              </p>
            </div>
          </div>

          <nav className="inline-flex p-1.5 bg-[var(--color-gray)] rounded-2xl">
            <button
              onClick={() => setActiveMode("garment")}
              style={{
                backgroundColor:
                  activeMode === "garment"
                    ? "var(--color-secondary)"
                    : "transparent",
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                activeMode === "garment"
                  ? "text-white shadow-xl"
                  : "text-gray-500 hover:text-[var(--color-black)]"
              }`}
            >
              <Shirt size={14} />
              Apparel
            </button>
            <button
              onClick={() => setActiveMode("room")}
              style={{
                backgroundColor:
                  activeMode === "room"
                    ? "var(--color-secondary)"
                    : "transparent",
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                activeMode === "room"
                  ? "text-white shadow-xl"
                  : "text-gray-500 hover:text-[var(--color-black)]"
              }`}
            >
              <Warehouse size={14} />
              Interior
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        {activeMode === "garment" ? <GarmentWorkspace /> : <RoomWorkspace />}
      </main>
    </div>
  );
}

/* ---------------- Workspaces ---------------- */

function GarmentWorkspace() {
  const [form, setForm] = useState(initialGarmentForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Logic: Both images must be present
  const isSubmitDisabled = !form.humanImage || !form.garmentImage || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    setLoading(true);
    setError("");
    try {
      setResult(await generateGarmentTryOn(form));
    } catch (err) {
      setError(err.message || "Operation failed. Check assets.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-5 order-2 lg:order-1"
      >
        <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-[var(--color-gray)] shadow-sm">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
              Configure{" "}
              <ChevronRight size={24} className="text-[var(--color-black)]" />
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-8">
            <FilePicker
              id="hImg"
              label="Model"
              hint="Portrait"
              file={form.humanImage}
              onChange={(f) => setForm({ ...form, humanImage: f })}
            />
            <FilePicker
              id="gImg"
              label="Product"
              hint="Flat Lay"
              file={form.garmentImage}
              onChange={(f) => setForm({ ...form, garmentImage: f })}
            />
          </div>

          <div className="space-y-6 mb-10">
            <div className="relative group">
              <label className="text-[10px] font-black uppercase text-[var(--color-black)] mb-2 block ml-1 tracking-widest">
                Style Direction
              </label>
              <input
                className="w-full px-5 py-4 bg-gray-50 border border-[var(--color-gray)] rounded-2xl focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all font-bold text-sm"
                value={form.style}
                onChange={(e) => setForm({ ...form, style: e.target.value })}
                placeholder="e.g. Streetwear, Luxury"
              />
            </div>
            <div className="relative group">
              <label className="text-[10px] font-black uppercase text-[var(--color-black)] mb-2 block ml-1 tracking-widest">
                Garment Category
              </label>
              <input
                className="w-full px-5 py-4 bg-gray-50 border border-[var(--color-gray)] rounded-2xl focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all font-bold text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Hoodie, Dress"
              />
            </div>
          </div>

          {error && (
            <div className="p-5 bg-red-50 text-[var(--color-error)] rounded-2xl text-[11px] mb-8 font-black uppercase tracking-tight border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            style={{
              backgroundColor: isSubmitDisabled
                ? "var(--color-gray)"
                : "var(--color-secondary)",
            }}
            className="group w-full py-5 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-[var(--color-primary)]/10 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <FaWandSparkles
                size={18}
                className="group-hover:rotate-45 transition-transform duration-500"
              />
            )}
            {loading ? "Processing Assets..." : "Generate Transformation"}
          </button>
        </div>
      </form>

      <div className="lg:col-span-7 order-1 lg:order-2">
        <ResultPanel
          result={result}
          imageKey="resultImageUrl"
          title="High-Fidelity Render"
        />
      </div>
    </div>
  );
}

function RoomWorkspace() {
  const [form, setForm] = useState(initialRoomForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Logic: Both images must be present
  const isSubmitDisabled = !form.roomPhoto || !form.itemPhoto || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    setLoading(true);
    setError("");
    try {
      setResult(await generateRoomTryOn(form));
    } catch (err) {
      setError(err.message || "Visualization failed. Check images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-5 order-2 lg:order-1"
      >
        <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-[var(--color-gray)] shadow-sm">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
              Environment{" "}
              <ChevronRight size={24} className="text-[var(--color-primary)]" />
            </h2>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-1 bg-gray-50 rounded-full border border-[var(--color-gray)]">
              Studio
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-8">
            <FilePicker
              id="rImg"
              label="Scene"
              hint="Main Room"
              file={form.roomPhoto}
              onChange={(f) => setForm({ ...form, roomPhoto: f })}
            />
            <FilePicker
              id="iImg"
              label="Object"
              hint="Furniture"
              file={form.itemPhoto}
              onChange={(f) => setForm({ ...form, itemPhoto: f })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            <div>
              <label className="text-[10px] font-black uppercase text-[var(--color-black)] mb-2 block ml-1 tracking-widest">
                Object Type
              </label>
              <input
                className="w-full px-5 py-4 bg-gray-50 border border-[var(--color-gray)] rounded-2xl focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all font-bold text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Sofa, Rug"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-[var(--color-black)] mb-2 block ml-1 tracking-widest">
                Anchor Point
              </label>
              <input
                className="w-full px-5 py-4 bg-gray-50 border border-[var(--color-gray)] rounded-2xl focus:border-[var(--color-primary)] focus:bg-white outline-none transition-all font-bold text-sm"
                value={form.placement}
                onChange={(e) =>
                  setForm({ ...form, placement: e.target.value })
                }
                placeholder="e.g. Center, Wall"
              />
            </div>
          </div>

          {error && (
            <div className="p-5 bg-red-50 text-[var(--color-error)] rounded-2xl text-[11px] mb-8 font-black uppercase tracking-tight border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            style={{
              backgroundColor: isSubmitDisabled
                ? "var(--color-gray)"
                : "var(--color-secondary)",
            }}
            className="group w-full py-5 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-[var(--color-primary)]/10 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Warehouse
                size={18}
                className="group-hover:scale-110 transition-transform duration-500"
              />
            )}
            {loading ? "Calculating Perspectives..." : "Visualize Space"}
          </button>
        </div>
      </form>

      <div className="lg:col-span-7 order-1 lg:order-2">
        <ResultPanel
          result={result}
          imageKey="resultImageUrl"
          title="Architectural Render"
        />
      </div>
    </div>
  );
}
