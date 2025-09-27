import { useState } from "react";

export default function FarmMedia({ 
  media = { images: [], videos: [] }
 }) {
  const [activeTab, setActiveTab] = useState("images");
  const [preview, setPreview] = useState(null);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-black)]">
          Farm Media
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("images")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              activeTab === "images"
                ? "bg-[var(--color-primary)] text-white"
                : "bg-gray-100 text-[var(--color-black)] hover:bg-gray-200"
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              activeTab === "videos"
                ? "bg-[var(--color-secondary)] text-white"
                : "bg-gray-100 text-[var(--color-black)] hover:bg-gray-200"
            }`}
          >
            Videos
          </button>
        </div>
      </div>

      {activeTab === "images" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {media.images.length > 0 ? (
            media.images.map((img, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-xl shadow-md border border-gray-200 cursor-pointer "
                onClick={() => setPreview({ type: "image", src: img })}
              >
                <img
                  src={img}
                  alt={`Farm image ${i + 1}`}
                  className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No images uploaded yet.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {media.videos.length > 0 ? (
            media.videos.map((video, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl shadow-md border border-gray-200 cursor-pointer"
                onClick={() => setPreview({ type: "video", src: video })}
              >
                <video
                  src={video}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold opacity-0 hover:opacity-100 transition">
                  ▶ Play
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No videos uploaded yet.</p>
          )}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-gray-300"
            >
              ✕
            </button>

            {preview.type === "image" ? (
              <img
                src={preview.src}
                alt="Preview"
                className="w-full max-h-[80vh] object-contain rounded-xl shadow-lg"
              />
            ) : (
              <video
                src={preview.src}
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded-xl shadow-lg"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
