import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";
import {
  ArrowDownToLine,
  Camera,
  CheckCircle2,
  ChevronRight,
  ImagePlus,
  Loader2,
  Maximize2,
  Shirt,
  Smartphone,
  StopCircle,
  Upload,
  Warehouse,
  Wifi
} from "lucide-react";
import { FaWandSparkles } from "react-icons/fa6";
import { useProductDetailsQuery } from "@/hooks/useProductsQuery";

import {
  generateGarmentTryOn,
  generateRoomTryOn,
  toAbsoluteApiUrl
} from "./api/api.js";
import { urlToFile } from "./api/imageUtils.js";
import { usePhoneSync } from "./hooks/usePhoneSync.js";
import { createPhoneSyncConnection } from "./api/phoneSyncService.js";

const initialGarmentForm = {
  humanImage: null,
  garmentImage: null,
  style: "casual",
  category: "shirt"
};

const initialRoomForm = {
  roomPhoto: null,
  itemPhoto: null,
  category: "rug",
  placement: "center of the room"
};

function useObjectUrl(file) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!file) { setUrl(""); return; }
    const nextUrl = URL.createObjectURL(file);
    setUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [file]);
  return url;
}

/* ─── File Picker ─────────────────────────────────────────── */
function FilePicker({ id, label, hint, file, sourceUrl, sourceLabel, capture = false, onChange }) {
  const previewUrl = useObjectUrl(file);
  const displayUrl = previewUrl || sourceUrl || "";
  const cameraInputId = `${id}-camera`;
  const galleryInputId = `${id}-gallery`;

  const handleFileChange = (e) => {
    onChange(e.target.files?.[0] || null);
    e.target.value = "";
  };

  return (
    <div className="w-full">
      {capture ? (
        <>
          <input id={cameraInputId} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
          <input id={galleryInputId} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </>
      ) : (
        <input id={id} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      )}

      <div className="group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-[var(--color-gray)] bg-white transition-all duration-500 hover:border-[var(--color-primary)] md:aspect-auto md:h-44">
        {displayUrl ? (
          <div className="relative h-full w-full">
            <img src={displayUrl} alt={`${label} preview`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-black)]/20 opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 className="text-white" size={24} />
            </div>
            {sourceLabel && !file && (
              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-[var(--color-primary)] shadow-sm">
                Using {sourceLabel}
              </div>
            )}
          </div>
        ) : (
          <label htmlFor={capture ? cameraInputId : id} className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 rounded-2xl bg-[var(--color-gray)] p-4 transition-colors duration-300 group-hover:bg-[var(--color-primary)]/10 group-hover:text-[var(--color-primary)]">
              <ImagePlus size={28} className="opacity-70" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[var(--color-black)]">{label}</p>
            <p className="mt-1 text-[10px] uppercase italic text-gray-400">{hint}</p>
          </label>
        )}

        {!capture && (
          <label htmlFor={id} className="absolute right-3 top-3 cursor-pointer rounded-full border border-[var(--color-gray)] bg-white p-2 shadow-lg transition-all duration-300 hover:scale-105" title="Upload image">
            <Upload size={14} className="text-[var(--color-primary)]" />
          </label>
        )}
      </div>

      {capture && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label htmlFor={cameraInputId} className="flex cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-[var(--color-gray)] bg-white py-3 text-[10px] font-black uppercase tracking-widest text-[var(--color-black)] shadow-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
            <Camera size={14} /> Camera
          </label>
          <label htmlFor={galleryInputId} className="flex cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-[var(--color-gray)] bg-white py-3 text-[10px] font-black uppercase tracking-widest text-[var(--color-black)] shadow-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
            <ImagePlus size={14} /> Gallery
          </label>
        </div>
      )}
    </div>
  );
}

/* ─── Phone Sync QR Panel (desktop only) ─────────────────── */
function PhoneSyncQRPanel({ sessionId, phoneJoined }) {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (!sessionId) return;
    const url = new URL(window.location.href);
    url.searchParams.set("mode", "mobile");
    url.searchParams.set("sessionId", sessionId);
    setQrUrl(url.toString());
  }, [sessionId]);

  if (!qrUrl) return null;

  return (
    <div className="mb-6 hidden rounded-2xl border border-[var(--color-gray)] bg-gray-50 p-4 lg:block">
      <div className="flex items-center gap-4">
        <div className="shrink-0 rounded-xl bg-white p-2 shadow-sm">
          <QRCode value={qrUrl} size={80} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <Wifi size={12} className={phoneJoined ? "text-green-600" : "text-gray-400"} />
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-black)]">
              Scan to Upload from Phone
            </p>
            {phoneJoined && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-black uppercase text-green-700">
                Connected
              </span>
            )}
          </div>
          <p className="text-[10px] leading-relaxed text-gray-500">
            {phoneJoined
              ? "Phone connected! Take a photo or pick from gallery — it'll appear here automatically."
              : "Scan with your phone. Use Camera or Gallery to send the photo directly here."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Phone Hint ──────────────────────────────────────────── */
function PhoneHint({ productName }) {
  return (
    <div className="mb-6 rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-primary)]/5 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-white p-2 text-[var(--color-primary)] shadow-sm">
          <Smartphone size={18} />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[var(--color-black)]">Phone try-on ready</p>
          <p className="mt-1 text-xs leading-relaxed text-gray-500">
            {productName
              ? `${productName} is already loaded as the Product/Object image.`
              : "Open this page from a product QR to auto-load the Product/Object image."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Result Panel ────────────────────────────────────────── */
function ResultPanel({ result, imageKey, title }) {
  const imageUrl = toAbsoluteApiUrl(result?.[imageKey]);

  if (!result) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-[var(--color-gray)] bg-gray-50/50 p-10 text-center lg:h-full">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-gray)] bg-[var(--color-secondary)] text-[var(--color-white)] shadow-sm">
          <FaWandSparkles size={32} className="opacity-40" />
        </div>
        <h2 className="text-xl font-black uppercase tracking-tighter text-[var(--color-black)]">Ready for Render</h2>
        <p className="mt-3 max-w-xs text-[10px] font-bold uppercase leading-relaxed tracking-widest text-gray-400">
          Add your phone photo and click render to visualize the product.
        </p>
      </div>
    );
  }

  return (
    <div className="sticky top-28 overflow-hidden rounded-[2.5rem] border border-[var(--color-gray)] bg-white shadow-2xl shadow-black/5">
      <div className="flex items-center justify-between border-b border-[var(--color-gray)] bg-white/80 p-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[var(--color-primary)] p-2 text-white shadow-lg shadow-[var(--color-primary)]/20">
            <CheckCircle2 size={20} />
          </div>
          <h2 className="text-sm font-black uppercase tracking-tight text-[var(--color-black)]">{title}</h2>
        </div>
        <a href={imageUrl} download style={{ backgroundColor: "var(--color-black)" }} className="group flex items-center gap-2 rounded-xl px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:opacity-90 active:scale-95">
          <span>Save Image</span>
          <ArrowDownToLine size={16} className="transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>
      <div className="p-4 md:p-8">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-gray)] bg-gray-50 shadow-inner">
          <img src={imageUrl} alt={title} className="h-auto w-full object-contain" />
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Upload Panel (phone side) ───────────────────── */
function MobileUploadPanel({ sessionId }) {
  const [status, setStatus] = useState("Connecting...");
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const connectionRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const conn = createPhoneSyncConnection();
    connectionRef.current = conn;
    conn
      .start()
      .then(() => conn.invoke("JoinSession", sessionId, "phone"))
      .then(() => setStatus("Connected — take a photo or pick from gallery"))
      .catch(() => setStatus("Could not connect. Check your network and try again."));
    return () => {
      stopCamera();
      conn.stop();
    };
  }, [sessionId]);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch {
      alert("Camera unavailable. Ensure HTTPS and camera permission, or use Gallery instead.");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  }

  function captureFromCamera() {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    setPreview(canvas.toDataURL("image/jpeg", 0.9));
    setFileName(`photo-${Date.now()}.jpg`);
    stopCamera();
    setSent(false);
  }

  function handleGalleryPick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setFileName(file.name);
      setSent(false);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function sendToDesktop() {
    if (!preview || !connectionRef.current) return;
    setSending(true);
    try {
      await connectionRef.current.invoke("SendImageToDesktop", {
        sessionId,
        fileName: fileName || `phone-${Date.now()}.jpg`,
        contentType: "image/jpeg",
        dataUrl: preview
      });
      setSent(true);
      setStatus("Photo sent! You can send another or close this page.");
    } catch {
      setStatus("Failed to send. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 font-sans text-[var(--color-black)]">
      <div className="mx-auto max-w-sm space-y-4">

        <div className="rounded-3xl border border-[var(--color-gray)] bg-white p-5 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-secondary)]">
            <FaWandSparkles className="text-white" size={20} />
          </div>
          <h1 className="text-lg font-black uppercase tracking-tighter">
            AI <span className="text-[var(--color-primary)]">Try-On</span>
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">{status}</p>
        </div>

        <div className="rounded-3xl border border-[var(--color-gray)] bg-white p-5 shadow-sm">
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest">Take a Photo</p>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-2xl bg-black"
            style={{ display: cameraActive ? "block" : "none", minHeight: 220, objectFit: "cover" }}
          />
          <div className={`flex gap-3 ${cameraActive ? "mt-3" : ""}`}>
            {!cameraActive ? (
              <button onClick={startCamera} className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black uppercase tracking-widest text-white" style={{ backgroundColor: "var(--color-secondary)" }}>
                <Camera size={16} /> Open Camera
              </button>
            ) : (
              <>
                <button onClick={captureFromCamera} className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black uppercase tracking-widest text-white" style={{ backgroundColor: "var(--color-secondary)" }}>
                  <Camera size={16} /> Capture
                </button>
                <button onClick={stopCamera} className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--color-gray)] px-4 py-3.5 text-xs font-black uppercase tracking-widest">
                  <StopCircle size={16} /> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--color-gray)] bg-white p-5 shadow-sm">
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest">Pick from Gallery</p>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[var(--color-gray)] py-4 text-xs font-black uppercase tracking-widest text-[var(--color-black)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
            <ImagePlus size={18} /> Select from Gallery
            <input type="file" accept="image/*" className="hidden" onChange={handleGalleryPick} />
          </label>
        </div>

        {preview && (
          <div className="rounded-3xl border border-[var(--color-gray)] bg-white p-5 shadow-sm">
            <p className="mb-3 text-[10px] font-black uppercase tracking-widest">Preview</p>
            <img src={preview} alt="Preview" className="w-full rounded-2xl object-contain" style={{ maxHeight: 300 }} />
            <button
              onClick={sendToDesktop}
              disabled={sending}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black uppercase tracking-widest text-white transition disabled:opacity-60"
              style={{ backgroundColor: sent ? "#16a34a" : "var(--color-secondary)" }}
            >
              {sending ? <Loader2 className="animate-spin" size={16} /> : sent ? <CheckCircle2 size={16} /> : <Upload size={16} />}
              {sent ? "Sent! Send Another?" : sending ? "Sending..." : "Send to Desktop"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

/* ─── Main TryOn ──────────────────────────────────────────── */
export default function TryOn() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const queryImage = searchParams.get("image");
  const queryName = searchParams.get("name");
  const modeParam = searchParams.get("mode");
  const sessionIdParam = searchParams.get("sessionId");
  const [activeMode, setActiveMode] = useState(
    modeParam === "room" ? "room" : "garment"
  );
  const { data: product } = useProductDetailsQuery(productId);

  const productContext = useMemo(() => {
    const productImage =
      queryImage ||
      product?.thumbnailUrl ||
      product?.images?.[0]?.url ||
      product?.images?.[0]?.thumbnailUrl ||
      "";
    return { imageUrl: productImage, name: queryName || product?.name || "" };
  }, [product, queryImage, queryName]);

  if (modeParam === "mobile" && sessionIdParam) {
    return <MobileUploadPanel sessionId={sessionIdParam} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[var(--color-black)] selection:bg-[var(--color-primary)] selection:text-white">
      <header className="sticky top-0 z-50 border-b border-[var(--color-gray)] bg-white/80 px-6 py-6 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-secondary)]">
              <FaWandSparkles className="text-white" size={20} />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-black uppercase leading-none tracking-tighter">
                AI <span className="text-[var(--color-primary)]">Try-on</span>
              </h1>
              <p className="mt-1 text-[8px] font-black uppercase tracking-[0.4em] text-gray-400">Phone Visual Engine</p>
            </div>
          </div>

          <nav className="inline-flex rounded-2xl bg-[var(--color-gray)] p-1.5">
            <button
              onClick={() => setActiveMode("garment")}
              style={{ backgroundColor: activeMode === "garment" ? "var(--color-secondary)" : "transparent" }}
              className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeMode === "garment" ? "text-white shadow-xl" : "text-gray-500 hover:text-[var(--color-black)]"}`}
            >
              <Shirt size={14} /> Apparel
            </button>
            <button
              onClick={() => setActiveMode("room")}
              style={{ backgroundColor: activeMode === "room" ? "var(--color-secondary)" : "transparent" }}
              className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeMode === "room" ? "text-white shadow-xl" : "text-gray-500 hover:text-[var(--color-black)]"}`}
            >
              <Warehouse size={14} /> Interior
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {activeMode === "garment" ? (
          <GarmentWorkspace productContext={productContext} />
        ) : (
          <RoomWorkspace productContext={productContext} />
        )}
      </main>
    </div>
  );
}

/* ─── Garment Workspace ───────────────────────────────────── */
function GarmentWorkspace({ productContext }) {
  const [form, setForm] = useState(initialGarmentForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const productImageUrl = productContext?.imageUrl;

  const { sessionId, phoneJoined } = usePhoneSync((file) => {
    setForm((prev) => ({ ...prev, humanImage: file }));
  });

  const hasGarmentImage = Boolean(form.garmentImage || productImageUrl);
  const isSubmitDisabled = !form.humanImage || !hasGarmentImage || loading;
  const missingMessage = !form.humanImage
    ? "Add your photo to generate."
    : !hasGarmentImage
      ? "Product image is still loading. You can upload one manually."
      : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    setLoading(true);
    setError("");
    try {
      let garmentImage = form.garmentImage;
      if (!garmentImage && productImageUrl) {
        garmentImage = await urlToFile(productImageUrl, "product-garment.jpg");
      }
      setResult(await generateGarmentTryOn({ ...form, garmentImage }));
    } catch (err) {
      setError(err.message || "Operation failed. Check assets.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
      <form onSubmit={handleSubmit} className="order-2 lg:order-1 lg:col-span-5">
        <div className="rounded-[3rem] border border-[var(--color-gray)] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-black uppercase tracking-tighter">
              Configure <ChevronRight size={24} className="text-[var(--color-black)]" />
            </h2>
          </div>

          <PhoneHint productName={productContext?.name} />
          <PhoneSyncQRPanel sessionId={sessionId} phoneJoined={phoneJoined} />

          <div className="mb-8 grid grid-cols-2 gap-5">
            <FilePicker id="hImg" label="Model" hint="Camera or gallery" file={form.humanImage} capture onChange={(f) => setForm({ ...form, humanImage: f })} />
            <FilePicker id="gImg" label="Product" hint="Auto from product" file={form.garmentImage} sourceUrl={productImageUrl} sourceLabel="Product" onChange={(f) => setForm({ ...form, garmentImage: f })} />
          </div>

          <div className="mb-10 space-y-6">
            <div>
              <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-[var(--color-black)]">Style Direction</label>
              <input className="w-full rounded-2xl border border-[var(--color-gray)] bg-gray-50 px-5 py-4 text-sm font-bold outline-none transition-all focus:border-[var(--color-primary)] focus:bg-white" value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })} placeholder="e.g. Streetwear, Luxury" />
            </div>
            <div>
              <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-[var(--color-black)]">Garment Category</label>
              <input className="w-full rounded-2xl border border-[var(--color-gray)] bg-gray-50 px-5 py-4 text-sm font-bold outline-none transition-all focus:border-[var(--color-primary)] focus:bg-white" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Hoodie, Dress" />
            </div>
          </div>

          {error && <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 p-5 text-[11px] font-black uppercase tracking-tight text-[var(--color-error)]">{error}</div>}

          {missingMessage && !loading && (
            <p className="mb-3 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
              {missingMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            style={{
              backgroundColor: loading
                ? "var(--color-secondary)"
                : isSubmitDisabled
                  ? "var(--color-gray)"
                  : "var(--color-secondary)"
            }}
            className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[2rem] py-5 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-[var(--color-primary)]/10 transition-all duration-500 active:scale-[0.97] ${
              loading ? "opacity-100" : "disabled:cursor-not-allowed disabled:opacity-70"
            }`}
          >
            {loading && <span className="absolute inset-0 animate-pulse bg-white/15" />}
            <span className="relative flex items-center gap-3">
            {loading ? <Loader2 className="animate-spin" size={18} /> : <FaWandSparkles size={18} className="transition-transform duration-500 group-hover:rotate-45" />}
            {loading ? "Processing Assets..." : "Generate Transformation"}
            </span>
          </button>
        </div>
      </form>

      <div className="order-1 lg:order-2 lg:col-span-7">
        <ResultPanel result={result} imageKey="resultImageUrl" title="High-Fidelity Render" />
      </div>
    </div>
  );
}

/* ─── Room Workspace ──────────────────────────────────────── */
function RoomWorkspace({ productContext }) {
  const [form, setForm] = useState(initialRoomForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const productImageUrl = productContext?.imageUrl;

  const { sessionId, phoneJoined } = usePhoneSync((file) => {
    setForm((prev) => ({ ...prev, roomPhoto: file }));
  });

  const hasItemImage = Boolean(form.itemPhoto || productImageUrl);
  const isSubmitDisabled = !form.roomPhoto || !hasItemImage || loading;
  const missingMessage = !form.roomPhoto
    ? "Add your room photo to visualize."
    : !hasItemImage
      ? "Product image is still loading. You can upload one manually."
      : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    setLoading(true);
    setError("");
    try {
      let itemPhoto = form.itemPhoto;
      if (!itemPhoto && productImageUrl) {
        itemPhoto = await urlToFile(productImageUrl, "product-object.jpg");
      }
      setResult(await generateRoomTryOn({ ...form, itemPhoto }));
    } catch (err) {
      setError(err.message || "Visualization failed. Check images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
      <form onSubmit={handleSubmit} className="order-2 lg:order-1 lg:col-span-5">
        <div className="rounded-[3rem] border border-[var(--color-gray)] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-black uppercase tracking-tighter">
              Environment <ChevronRight size={24} className="text-[var(--color-primary)]" />
            </h2>
            <div className="rounded-full border border-[var(--color-gray)] bg-gray-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Studio</div>
          </div>

          <PhoneHint productName={productContext?.name} />
          <PhoneSyncQRPanel sessionId={sessionId} phoneJoined={phoneJoined} />

          <div className="mb-8 grid grid-cols-2 gap-5">
            <FilePicker id="rImg" label="Scene" hint="Camera or gallery" file={form.roomPhoto} capture onChange={(f) => setForm({ ...form, roomPhoto: f })} />
            <FilePicker id="iImg" label="Object" hint="Auto from product" file={form.itemPhoto} sourceUrl={productImageUrl} sourceLabel="Product" onChange={(f) => setForm({ ...form, itemPhoto: f })} />
          </div>

          <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-[var(--color-black)]">Object Type</label>
              <input className="w-full rounded-2xl border border-[var(--color-gray)] bg-gray-50 px-5 py-4 text-sm font-bold outline-none transition-all focus:border-[var(--color-primary)] focus:bg-white" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Sofa, Rug" />
            </div>
            <div>
              <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-[var(--color-black)]">Anchor Point</label>
              <input className="w-full rounded-2xl border border-[var(--color-gray)] bg-gray-50 px-5 py-4 text-sm font-bold outline-none transition-all focus:border-[var(--color-primary)] focus:bg-white" value={form.placement} onChange={(e) => setForm({ ...form, placement: e.target.value })} placeholder="e.g. Center, Wall" />
            </div>
          </div>

          {error && <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 p-5 text-[11px] font-black uppercase tracking-tight text-[var(--color-error)]">{error}</div>}

          {missingMessage && !loading && (
            <p className="mb-3 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
              {missingMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            style={{
              backgroundColor: loading
                ? "var(--color-secondary)"
                : isSubmitDisabled
                  ? "var(--color-gray)"
                  : "var(--color-secondary)"
            }}
            className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[2rem] py-5 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-[var(--color-primary)]/10 transition-all duration-500 active:scale-[0.97] ${
              loading ? "opacity-100" : "disabled:cursor-not-allowed disabled:opacity-70"
            }`}
          >
            {loading && <span className="absolute inset-0 animate-pulse bg-white/15" />}
            <span className="relative flex items-center gap-3">
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Warehouse size={18} className="transition-transform duration-500 group-hover:scale-110" />}
            {loading ? "Calculating Perspectives..." : "Visualize Space"}
            </span>
          </button>
        </div>
      </form>

      <div className="order-1 lg:order-2 lg:col-span-7">
        <ResultPanel result={result} imageKey="resultImageUrl" title="Architectural Render" />
      </div>
    </div>
  );
}
