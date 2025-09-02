import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ title, children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="
          h-full w-full bg-white shadow-xl
          sm:h-auto sm:max-w-md sm:rounded-2xl
        "
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <button
            onClick={onClose}
            className="hidden rounded-full p-1 hover:bg-gray-100 sm:block"
          >
            <X size={20} />
          </button>
          <h2 className="text-base font-semibold">{title}</h2>
          <div className="w-6 sm:w-auto" />
        </div>

        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthModal;
