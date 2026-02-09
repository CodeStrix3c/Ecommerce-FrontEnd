import React from "react";
import { useParams } from "react-router-dom";
import agriculturalOptions from "@/data/agriculturalOptions";

const GiDetails = () => {
  const { giTag } = useParams();

  const giData = agriculturalOptions.find((item) => item.giId === giTag);

  if (!giData) return <p className="p-6">GI details not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700">
        GI Certified Product
      </h1>

      {giData.image && (
        <img
          src={giData.image}
          alt=""
          className="w-full max-h-[350px] object-contain mt-4"
        />
      )}

      <h2 className="text-xl font-semibold mt-4">{giData.product}</h2>

      <p className="text-gray-600">Origin : {giData.origin}</p>

      <p className="text-gray-600">Category : {giData.category}</p>

      <p className="mt-4">{giData.description}</p>

      <p className="text-sm text-gray-400 mt-4">GI Tag : {giTag}</p>
    </div>
  );
};

export default GiDetails;
