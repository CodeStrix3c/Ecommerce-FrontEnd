import React, { useState } from "react";
import { Leaf, FlaskRound, Bug, X } from "lucide-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const sprayHistoryData = [
  {
    id: 1,
    type: "Herbicide",
    name: "Cap",
    quantity: "1 kg",
    waterUsed: "10 L",
    totalTrees: 25,
    date: "May - Sep 2025",
    cost: "5000 per 1kg",
  },
  {
    id: 2,
    type: "Fertilizer",
    name: "GrowFast",
    quantity: "2 kg",
    waterUsed: "15 L",
    totalTrees: 40,
    date: "Aug - Oct 2025",
    cost: "6000 per 2kg",
  },
  {
    id: 3,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
  {
    id: 4,
    type: "Pesticide",
    name: "CropGuard",
    quantity: "250 ml",
    waterUsed: "5 L",
    totalTrees: 10,
    date: "Jul - Aug 2025",
    cost: "1500 per 250ml",
  },
  {
    id: 5,
    type: "Herbicide",
    name: "WeedClear",
    quantity: "1 L",
    waterUsed: "10 L",
    totalTrees: 20,
    date: "Jun - Jul 2025",
    cost: "4000 per 1L",
  },
  {
    id: 6,
    type: "Fertilizer",
    name: "RootBoost",
    quantity: "3 kg",
    waterUsed: "20 L",
    totalTrees: 50,
    date: "Mar - May 2025",
    cost: "7000 per 3kg",
  },
];

export default function SprayHistory() {
  const [notes, setNotes] = useState("<p>Add spray management notes here...</p>");
  const [showEditor, setShowEditor] = useState(false);

  const totalCost = sprayHistoryData.reduce((sum, item) => {
    const num = parseFloat(item.cost.replace(/[^\d.]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);


  const typeIcons = {
    Herbicide: <Leaf className="text-[var(--color-secondary)]" size={22} />,
    Fertilizer: <FlaskRound className="text-[var(--color-secondary)]" size={22} />,
    Pesticide: <Bug className="text-[var(--color-secondary)]" size={22} />,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 relative">
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-[var(--color-black)] mb-3">
          Add or Update Spray Notes
        </h3>

        <button
          onClick={() => setShowEditor(true)}
          className="bg-[var(--color-secondary)] text-[var(--color-white)] px-4 py-2 rounded-md shadow hover:opacity-90 transition"
        >
          Open CKEditor
        </button>


        <div className="mt-3 p-2 bg-gray border rounded-md">
          <h4 className="font-semibold text-[var(--color-black)] mb-2">
            Notes Preview:
          </h4>
          <div
            className="prose text-[var(--color-black)] max-w-none"
            dangerouslySetInnerHTML={{ __html: notes }}
          />
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sprayHistoryData.map((item) => (
          <div
            key={item.id + item.name}
            className="p-5 rounded-2xl bg-[var(--color-white)] shadow-sm border border-gray-200 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {typeIcons[item.type]}
                <span className="font-semibold text-lg text-[var(--color-black)]">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-medium bg-[var(--color-secondary)] text-[var(--color-white)] px-2 py-1 rounded-md">
                {item.type}
              </span>
            </div>

            <div className="space-y-1 text-[var(--color-black)] text-sm">
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Water Used:</strong> {item.waterUsed}</p>
              <p><strong>Total Trees:</strong> {item.totalTrees}</p>
              <p><strong>Duration:</strong> {item.date}</p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-[var(--color-white)]">
              <span className="text-sm text-[var(--color-gray)] font-medium">
                Spray Cost
              </span>
              <span className="font-semibold text-[var(--color-primary)]">
                ₹{item.cost}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-2xl bg-[var(--color-black-hover)] flex justify-between items-center shadow-sm">
        <span className="text-lg font-semibold text-[var(--color-black)]">
          Total Cost
        </span>
        <span className="text-xl font-bold text-[var(--color-secondary)]">
          ₹{totalCost.toLocaleString()}
        </span>
      </div>

      {showEditor && (
        <div className="fixed inset-0 bg-[var(--color-black)] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-[var(--color-white)] rounded-xl shadow-xl p-6 w-full max-w-2xl relative">

            <button
              onClick={() => setShowEditor(false)}
              className="absolute top-3 right-3 text[var(--color-gray)] hover:[var(--color-red)] transition"
            >
              <X size={22} />
            </button>

            <h3 className="text-lg font-semibold  text[var(--color-gray)] mb-4">
              Edit Spray Notes
            </h3>

            <div className="border border-gray-200 rounded-md overflow-hidden">
              <CKEditor
                editor={ClassicEditor}
                data={notes}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setNotes(data);
                }}
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowEditor(false)}
                className="bg-[var(--color-secondary)]  text[var(--color-white)] px-4 py-2 rounded-md hover:opacity-90 transition"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
