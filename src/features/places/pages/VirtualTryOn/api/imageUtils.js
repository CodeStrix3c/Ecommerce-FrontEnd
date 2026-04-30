// src/api/imageUtils.js

export const urlToFile = async (
  url,
  filename = "garment.jpg"
) => {

  const response = await fetch(url);

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