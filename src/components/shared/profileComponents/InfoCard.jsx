import React, { useState } from "react";

const UserHeaderCard = ({ title, image, name, icon:Icon}) => {
    const [verified, setVerified]= useState(false);

  return (
    <div cl>
      {title}
      <div className="flex justify-center">
        <h1 className="py-5 text-xl font-bold text-[var(--color-black)]">
        </h1>
      </div>
      {/* User Info Card */}
      <div className="flex items-center space-x-4 mb-6 bg-[var(--color-black-hover)] p-2 rounded-sm">
        
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white"
        />
        <div>
          <div className="text-md font-bold text-gray-800">{name}</div>
        </div>

        
        {Icon && <Icon className="w-6 h-6 text-green-600" />}

      </div>
    </div>
  );
};

export default UserHeaderCard;
