// src/api/imageUtils.js

export const urlToFile = async (
  url,
  filename = "garment.jpg"
) => {

  const response = await fetchImage(url);

  if (!response.ok) {

    throw new Error(
      "Failed to fetch garment image"
    );

  }

  const blob =
    await response.blob();

  return new File(
    [blob],
    filename,
    {
      type:
        blob.type ||
        "image/jpeg"
    }
  );

};

async function fetchImage(url) {
  try {
    return await fetch(url);
  } catch {
    return fetchProxiedImage(url);
  }
}

async function fetchProxiedImage(url) {
  const proxyPaths = [
    `/api/image-proxy?url=${encodeURIComponent(url)}`,
    `/.netlify/functions/image-proxy?url=${encodeURIComponent(url)}`
  ];

  let lastError;

  for (const proxyPath of proxyPaths) {
    try {
      const response = await fetch(proxyPath);
      if (response.ok) return response;
      lastError = new Error(`Image proxy failed with ${response.status}`);
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to fetch garment image");
}
