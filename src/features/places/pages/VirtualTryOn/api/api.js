const DEFAULT_API_BASE_URL = "https://ai-ecomintegration-c2ffbzcxg0a9dtdj.centralindia-01.azurewebsites.net";

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/$/, "");

export function toAbsoluteApiUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

async function readError(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/problem+json") || contentType.includes("application/json")) {
    const data = await response.json();
    return data.detail || data.title || data.error || JSON.stringify(data);
  }

  return (await response.text()) || `Request failed with ${response.status}`;
}

export async function generateGarmentTryOn({ humanImage, garmentImage, style, category }) {
  const form = new FormData();
  form.append("humanImage", humanImage);
  form.append("garmentImage", garmentImage);
  form.append("style", style || "");
  form.append("category", category || "");

  const response = await fetch(`${API_BASE_URL}/api/tryon/generate`, {
    method: "POST",
    body: form
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}

export async function generateRoomTryOn({ roomPhoto, itemPhoto, category, placement }) {
  const form = new FormData();
  form.append("roomPhoto", roomPhoto);
  form.append("itemPhoto", itemPhoto);
  form.append("category", category || "");
  form.append("placement", placement || "");

  const response = await fetch(`${API_BASE_URL}/api/roomtryon/generate`, {
    method: "POST",
    body: form
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}
