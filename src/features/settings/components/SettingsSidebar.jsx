import React from "react";

const SettingsSidebar = ({ active, setActive }) => {
  const menuItems = [
        { id: "addresses", label: "Manage Address" },
    { id: "password", label: "Manage Password" },
     { id: "appearance", label: "Manage Appearance" },
    
        { id: "reviews", label: "My Reviews" },
          { id: "orders", label: "My Orders" },
          {id: "help-center", label: "Help Center"},       
  
  

  ];

  return (
    <div className="w-64 bg-[var(--color-white)]  border border-[var(--color-gray)] rounded-lg p-3 h-fit">

      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`w-full text-left px-3 py-2 rounded mb-1 text-sm transition
            ${active === item.id
              ? "bg-[var(--color-primary)] text-white"
              : "text-[var(--color-black)] hover:bg-[var(--color-gray)]"
            }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SettingsSidebar;