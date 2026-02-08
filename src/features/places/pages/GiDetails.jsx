import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";
import { useProductsQuery } from "@/hooks/useProductsQuery";

const IMAGE_BASE_URL =
  "https://zirat-adminapp-gfd0hmfwefc3gmgc.centralindia-01.azurewebsites.net";

const GiDetails = () => {
  const { giTag } = useParams();

  // Fetch all products (real backend data)
  const { data: products, isLoading } = useProductsQuery();

  const [giProduct, setGiProduct] = useState(null);

  useEffect(() => {
    if (!products) return;

    // Find product where attribute GI matches URL
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

  // Prepare image
  const image =
    giProduct.images?.[0]?.url
      ? giProduct.images[0].url.startsWith("http")
        ? giProduct.images[0].url
        : `${IMAGE_BASE_URL}${giProduct.images[0].url}`
      : null;

  // Extract origin/category from attributes if available
  const origin = giProduct.attributes?.find((a) =>
    a.name.toLowerCase().includes("origin")
  )?.value;

  const category = giProduct.categoryName || giProduct.category || "Agricultural";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700">
        GI Certified Product
      </h1>

      {image && (
        <img
          src={image}
          alt={giProduct.name}
          className="w-full max-h-[350px] object-contain mt-4"
        />
      )}

      <h2 className="text-xl font-semibold mt-4">
        {giProduct.name}
      </h2>

      {origin && (
        <p className="text-gray-600">
          Origin : {origin}
        </p>
      )}

      <p className="text-gray-600">
        Category : {category}
      </p>

      <div
        className="mt-4 prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: giProduct.description || "No description available",
        }}
      />

      <p className="text-sm text-gray-400 mt-4">
        GI Tag : {giTag}
      </p>
    </div>
  );
};

export default GiDetails;
