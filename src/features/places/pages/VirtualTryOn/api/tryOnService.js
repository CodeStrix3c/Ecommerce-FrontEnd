// src/api/tryOnService.js

const BASE_URL =
"https://ai-ecomintegration-c2ffbzcxg0a9dtdj.centralindia-01.azurewebsites.net";

export const generateTryOn = async ({
  humanImage,
  garmentImage,
  category,
  style
}) => {

  /* CREATE PAYLOAD */

  const formData =
    new FormData();

  formData.append(
    "humanImage",
    humanImage
  );

  formData.append(
    "garmentImage",
    garmentImage
  );

  if (category) {

    formData.append(
      "category",
      category
    );

  }

  if (style) {

    formData.append(
      "style",
      style
    );

  }

  /* SEND POST */

  const response =
    await fetch(

      `${BASE_URL}/api/tryon/generate/file`,

      {
        method: "POST",
        body: formData
      }

    );

  if (!response.ok) {

    const text =
      await response.text();

    throw new Error(text);

  }

  /* Backend returns JSON */

  const data =
    await response.json();

  return data;

};