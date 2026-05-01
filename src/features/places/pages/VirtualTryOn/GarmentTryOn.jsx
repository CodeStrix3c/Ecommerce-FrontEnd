import React, { useState } from "react";
import {
  Loader2,
  Sparkles
} from "lucide-react";

import {
  generateGarmentTryOn
} from "./api/api";

const initialForm = {
  humanImage: null,
  garmentImage: null,
  style: "casual",
  category: "shirt"
};

function GarmentTryOn() {

  const [form, setForm] =
    useState(initialForm);

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const canSubmit =
    form.humanImage &&
    form.garmentImage &&
    !loading;

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const res =
        await generateGarmentTryOn(form);

      setResult(res);

    } catch (err) {

      setError(
        err.message ||
        "Generation failed"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="workspace">

      <form
        className="tool-panel"
        onSubmit={handleSubmit}
      >

        <h2>
          Garment Try-On
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              humanImage:
                e.target.files[0]
            })
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              garmentImage:
                e.target.files[0]
            })
          }
        />

        <input
          value={form.style}
          placeholder="Style"
          onChange={(e) =>
            setForm({
              ...form,
              style: e.target.value
            })
          }
        />

        <input
          value={form.category}
          placeholder="Category"
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value
            })
          }
        />

        {error &&
          <div className="error-box">
            {error}
          </div>
        }

        <button
          disabled={!canSubmit}
          className="primary-button"
        >

          {loading
            ? <Loader2 size={18}/>
            : <Sparkles size={18}/>
          }

          {loading
            ? "Generating..."
            : "Generate Try-On"
          }

        </button>

      </form>

      {result?.resultImageUrl && (

        <img
          src={result.resultImageUrl}
          alt="Result"
          className="result-image"
        />

      )}

    </div>

  );
}

export default GarmentTryOn;