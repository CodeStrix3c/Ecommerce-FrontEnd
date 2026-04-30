// src/hooks/useTryOn.js

import { useState } from "react";
import { urlToFile } from "../api/imageUtils";
import { generateTryOn } from "../api/tryOnService";



const BASE_URL =
"https://ai-ecomintegration-c2ffbzcxg0a9dtdj.centralindia-01.azurewebsites.net";

export const useTryOn = () => {

  const [loading,
    setLoading] =
    useState(false);

  const [resultImage,
    setResultImage] =
    useState(null);

  const [error,
    setError] =
    useState(null);

  const generate = async ({

    humanImage,
    garmentImageUrl,
    category,
    style

  }) => {

    try {

      setLoading(true);
      setError(null);

      /* Convert product URL → File */

      const garmentFile =
        await urlToFile(
          garmentImageUrl
        );

      /* Send payload */

      const response =
        await generateTryOn({

          humanImage,
          garmentImage: garmentFile,
          category,
          style

        });

      /* Build result image URL */

      const fullImageUrl =
        `${BASE_URL}${response.resultImageUrl}`;

      setResultImage(
        fullImageUrl
      );

      return fullImageUrl;

    }
    catch (err) {

      console.error(err);

      setError(
        err.message
      );

      throw err;

    }
    finally {

      setLoading(false);

    }

  };

  const reset = () => {

    setResultImage(null);
    setError(null);

  };

  return {

    loading,
    resultImage,
    error,
    generate,
    reset

  };

};