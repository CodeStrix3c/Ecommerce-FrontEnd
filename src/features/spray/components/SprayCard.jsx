import React, { useState } from "react";
import { Leaf, FlaskRound, Bug, X, PlusCircle } from "lucide-react";
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
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
  {
    id: 5,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
  {
    id: 6,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
  {
    id: 6,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
  {
    id: 7,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
];

export default function SprayHistory() {
  const [showEditor, setShowEditor] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([

  ]);

  const totalCost = sprayHistoryData.reduce((sum, item) => {
    const num = parseFloat(item.cost.replace(/[^\d.]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const typeIcons = {
    Herbicide: <Leaf className="text-[var(--color-secondary)]" size={22} />,
    Fertilizer: (
      <FlaskRound className="text-[var(--color-secondary)]" size={22} />
    ),
    Pesticide: <Bug className="text-[var(--color-secondary)]" size={22} />,
  };

  const handleSaveNote = () => {
    if (newNote.trim() === "") return;
    const note = { id: Date.now(), text: newNote };
    setNotes([note, ...notes]);
    setNewNote("");
    setShowEditor(false);
  };

  return (
    <div className="mx-auto  ">
      <h3 className="text-xl lg:text-3xl md:text-xl font-semibold text-[var(--color-black)] mb-4 mt-4 text-center">
        Spray Records
      </h3>

      <p className="mx-auto max-w-5xl  text-center text-[var(--color-black)] leading-relaxed mb-6">
        Record, manage, and monitor every detail of your spray operations — from
        chemicals to weather logs.
      </p>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-[var(--color-black)] mb-4">
          Spray Notes & Reviews
        </h3>
        {notes.length === 0 ? (
          <p className="text-[var(--color-black)] italic">No notes added yet.</p>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-2xl p-5 backdrop-blur-md bg-[var(--color-white)] border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <div
                  className="prose max-w-none text-[var(--color-black)]"
                  dangerouslySetInnerHTML={{ __html: note.text }}
                />
              </div>
            ))}
          </div>
        )}
      </div>


      <h3 className="text-2xl font-semibold text-[var(--color-black)] mb-4">
        Spray Applications
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sprayHistoryData.map((item) => (
          <div
            key={item.id + item.nm}
            className="p-5 rounded-2xl bg-[var(--color-white)] shadow-sm border border-gray-200 hover:shadow-md transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {typeIcons[item.type]}
                <span className="font-semibold text-lg text-[var(--color-black)]">
                  {item.nm}
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

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-x-gray-50">
              <span className="text-sm text-[var(--color-gray)] font-medium">Spray Cost</span>
              <span className="font-semibold text-[var(--color-primary)]">₹{item.cost}</span>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-10 p-5 rounded-2xl bg-[var(--color-black-hover)] flex justify-between items-center shadow-sm">
        <span className="text-lg font-semibold text-[var(--color-black)]">Total Cost</span>
        <span className="text-xl font-bold text-[var(--color-secondary)]">₹{totalCost.toLocaleString()}</span>
      </div>


      {showEditor && (
        <div className="fixed inset-0 z-50 bg-[var(--color-black)] flex flex-col justify-center items-center">
          <div className="w-[95%] md:w-[80%] h-[80vh] bg-[var(--color-white)] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">

            <div className="flex justify-between items-center p-4 border-b bg-[var(--color-black-hover)]">
              <h3 className="text-xl font-semibold text-[var(--color-black)]">
                Add Spray Note / Review
              </h3>
              <button
                onClick={() => setShowEditor(false)}
                className="text-[var(--color-gray)] hover:text-[var(--color-red)] transition"
              >
                <X size={24} />
              </button>
            </div>


            <div className="flex-1 overflow-y-auto p-4">
              <CKEditor
                editor={ClassicEditor}
                data={newNote}
                onChange={(event, editor) => setNewNote(editor.getData())}
              />
            </div>


            <div className="p-4 border-t flex justify-end gap-3 bg-[var(--color-black-hover)]">
              <button
                onClick={() => setShowEditor(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-5 py-2 rounded-md bg-[var(--color-secondary)] text-[var(--color-white)] font-semibold hover:opacity-90 transition"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
