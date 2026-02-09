import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";
import { useProductsQuery } from "@/hooks/useProductsQuery";

const IMAGE_BASE_URL =
  "https://zirat-adminapp-gfd0hmfwefc3gmgc.centralindia-01.azurewebsites.net";

const GiDetails = () => {
  const { giTag } = useParams();

  
  const { data: products, isLoading } = useProductsQuery();

  const [giProduct, setGiProduct] = useState(null);


  useEffect(() => {
    if (!products) return;


    const matchedProduct = products.find((product) =>
      product.attributes?.some(
        (attr) =>
          attr?.name?.toLowerCase().includes("gi") &&
          attr?.value === giTag
      )
    );

    setGiProduct(matchedProduct);
  }, [products, giTag]);

  if (isLoading) return <Spinner />;

  if (!giProduct)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-500">GI details not found</p>
      </div>
    );

  const image =
    giProduct.images?.[0]?.url
      ? giProduct.images[0].url.startsWith("http")
        ? giProduct.images[0].url
        : `${IMAGE_BASE_URL}${giProduct.images[0].url}`
      : null;

  const origin = giProduct.attributes?.find((a) =>
    a.name.toLowerCase().includes("origin")
  )?.value;

  const category = giProduct.categoryName || giProduct.category || " ";

 return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="bg-white w-full max-w-3xl border-4 border-green-700 rounded-lg shadow-lg p-8 text-center">

      {/* Header */}
      <h1 className="text-3xl font-bold text-green-800">
        Geographical Indication Certificate
      </h1>
      <p className="text-gray-500 mt-1">
        Government Recognized GI Product
      </p>

      {/* Divider */}
      <div className="border-t-2 border-green-700 my-6"></div>

      {/* Product Image */}
      {image && (
        <img
          src={image}
          alt={giProduct.name}
          className="mx-auto max-h-[220px] object-contain"
        />
      )}

      {/* Product Name */}
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        {giProduct.name}
      </h2>

      {/* Details */}
      <div className="mt-4 text-lg text-gray-700 space-y-1">
        {origin && <p><strong>Origin:</strong> {origin}</p>}
        <p><strong>Category:</strong> {category}</p>
      </div>

      {/* Description */}
      <div
        className="mt-6 text-gray-600 text-left prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: giProduct.description || "No description available",
        }}
      />

      {/* GI Tag Highlight */}
      <div className="mt-8 border-2 border-dashed border-green-700 inline-block px-6 py-3 rounded-lg">
        <p className="text-sm text-gray-500">GI Registration Number</p>
        <p className="text-2xl font-bold text-green-800">{giTag}</p>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-400">
        This certificate verifies the authenticity of the registered GI product.
      </p>
    </div>
  </div>
);
}

export default GiDetails;
