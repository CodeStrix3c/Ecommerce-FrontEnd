import React, { useState } from "react";
import {
  Loader2,
  Sparkles
} from "lucide-react";

import {
  generateRoomTryOn
} from "./api/api";

const initialForm = {

  roomPhoto: null,
  itemPhoto: null,
  category: "rug",
  placement: "center"

};

function RoomTryOn() {

  const [form, setForm] =
    useState(initialForm);

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const canSubmit =
    form.roomPhoto &&
    form.itemPhoto &&
    !loading;

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const res =
        await generateRoomTryOn(form);

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
          Room Try-On
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              roomPhoto:
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
              itemPhoto:
                e.target.files[0]
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

        <input
          value={form.placement}
          placeholder="Placement"
          onChange={(e) =>
            setForm({
              ...form,
              placement: e.target.value
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
            : "Generate Room View"
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

export default RoomTryOn;