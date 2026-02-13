import React from "react";
import { ChevronDown } from "lucide-react";

const ProductInfoPanel = ({
  place,
  openSections,
  toggleSection,
}) => {
  const Accordion = ({ title, sectionKey, children, show }) => {
    if (!show) return null;

    return (
      <div className="border border-[var(--color-gray)] rounded-xl overflow-hidden bg-[var(--color-white)]">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between px-4 py-3 font-semibold text-[var(--color-black)]"
        >
          {title}
          <ChevronDown
            size={18}
            className={`transition-transform ${
              openSections[sectionKey] ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections[sectionKey] && (
          <div className="px-4 pb-4 text-sm text-[var(--color-black)]">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
 <div className="bg-[var(--color-white)] space-y-2">

  {/* TITLE */}
  {place.title && (
    <section>
      <div
        className="text-2xl font-bold text-[var(--color-black)]"
        dangerouslySetInnerHTML={{
          __html: place.title,
        }}
      />
    </section>
  )}

    {/* BRAND */}
  {place.brand && (
    <div>
      <p className="text-sm text-[var(--color-black)]">{place.brand}</p>
    </div>
  )}

  {/* PRICE */}
  <section>
    <div className="flex items-center flex-wrap gap-2">
      <span className="text-2xl font-bold text-[var(--color-primary)]">
        ₹{place.price}
      </span>

      {place.oldPrice && (
        <span className="text-[var(--color-black)] line-through text-base">
          MRP ₹{place.oldPrice}
        </span>
      )}

      {place.discount > 0 && (
        <span className="bg-[var(--color-secondary)] text-[var(--color-white)] px-2 py-0.5 rounded-md text-xs font-semibold">
          {place.discount}% OFF
        </span>
      )}
    </div>

    {place.oldPrice && place.discount > 0 && (
      <p className="text-xs text-[var(--color-primary)] font-medium">
        You save ₹{place.oldPrice - place.price}
      </p>
    )}
  </section>

  {/* STOCK */}
  {(place.stockTracking || !place.isAllowToOrder) && (
    <div className="text-sm space-y-1">
      <p>
        {place.inStock ? (
          <span className="text-[var(--color-white)] bg-[var(--color-primary)] px-2 py-0.5 rounded-sm font-semibold text-xs">
            In Stock
          </span>
        ) : (
          <span className="text-[var(--color-error)]">
            Out of Stock
          </span>
        )}
      </p>

      {place.stockTracking && (
        <p>Quantity Available: {place.stock}</p>
      )}

      {!place.isAllowToOrder && (
        <p className="text-[var(--color-error)]">
          Ordering currently disabled
        </p>
      )}
    </div>
  )}

 

  {/* SHORT DESCRIPTION */}
  {place.shortDescription && (
    <section>
      <div
        className="text-sm text-[var(--color-black)] leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: place.shortDescription,
        }}
      />
    </section>
  )}

</div>


      {/* ACCORDIONS */}
      <div className="mt-4 space-y-4">
        <Accordion
          title="Description"
          sectionKey="description"
          show={!!place.description}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: place.description,
            }}
          />
        </Accordion>

        <Accordion
          title="specification"
          sectionKey="specification"
          show={!!place.specification}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: place.specification,
            }}
          />
        </Accordion>

        <Accordion
          title="Attributes"
          sectionKey="attributes"
          show={place.perks && place.perks.length > 0}
        >
          <ul className="list-disc pl-5 space-y-1">
            {place.perks.map((attr, index) => (
              <li key={index}>
                <strong>{attr.name}:</strong> {attr.value}
              </li>
            ))}
          </ul>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductInfoPanel;
