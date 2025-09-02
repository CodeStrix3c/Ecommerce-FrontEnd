import React from 'react';
import { Heart, Share2 } from 'lucide-react';

export default function ListingHeader({
  title = 'Mud & Mango | garden retreat',
  initiallySaved = false,
  onShare,
  onSave,
}) {
  const [saved, setSaved] = React.useState(initiallySaved);

  const handleShare = async () => {
    if (onShare) return onShare();
    const shareData = {
      title,
      text: title,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && shareData.url) {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = () => {
    const next = !saved;
    setSaved(next);
    onSave?.(next);
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex  items-center justify-between gap-4 py-5">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
          {title}
        </h1>

        <div className="flex items-center text-gray-700">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-sm px-2 py-1 transition hover:bg-gray-100   sm:px-3"
            aria-label="Share"
          >
            <Share2 className="size-5" aria-hidden="true" />
            <span className="hidden underline sm:inline">Share</span>
          </button>

          <span
            className="mx-1 h-5 w-px bg-gray-300 sm:mx-2"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-sm px-2 py-1 transition hover:bg-gray-100   sm:px-3"
            aria-pressed={saved}
            aria-label={saved ? 'Unsave' : 'Save'}
          >
            <Heart
              className={`size-5 ${saved ? 'fill-current text-rose-600' : ''}`}
              aria-hidden="true"
            />
            <span className="hidden underline sm:inline">Save</span>
          </button>
        </div>
      </div>
    </header>
  );
}
