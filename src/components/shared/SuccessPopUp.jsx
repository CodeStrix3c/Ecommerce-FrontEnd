import React, { useState } from "react";

function SuccessPopUp({
  open,
  message = "Your submission was successful!",
  onClose = () => {},
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <h3 className="text-lg font-semibold text-green-600 mb-2">✅ Success</h3>
        <p className="text-slate-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}

//////testing button whether code is working or not
export default function SuccessPopUpTest() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white rounded-md px-8 py-4 text-lg font-bold hover:bg-blue-600 transition"
      >
        Open Success PopUp
      </button>

      <SuccessPopUp
        open={open}
        message="Your code is working!"
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
