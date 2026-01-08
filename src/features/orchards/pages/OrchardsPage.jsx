import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import OrchardsSummary from "../components/OrchardsSummary";
import OrchardContent from "./OrchardContent";
import FilterDropdown from "@/components/shared/FilterDropDown";
import { useOrchardsPageQuery } from "@/hooks/useOrchardsQuery";

export default function OrchardsPage() {
  const { data: orchards = [] } = useOrchardsPageQuery();

  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Dynamically generate dropdown options from textile categories
  const orchardTypes = useMemo(() => {
    const types = Array.from(new Set(orchards?.map((o) => o.type)));
    return [
      { value: "All", label: "All" },
      ...types.map((t) => ({ value: t, label: t })),
    ];
  }, [orchards]);

  // Filtering logic
  const filtered = useMemo(() => {
    return orchards?.filter((o) => {
      const matchesQuery = [o.name, o.location, o.varieties.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesType =
        filterType === "All" || !filterType
          ? true
          : o.type.toLowerCase() === filterType.toLowerCase();

      return matchesQuery && matchesType;
    });
  }, [orchards, query, filterType]);

  return (
    <ContentWrapper topSpacing>
      <div className="min-h-screen text-[var(--color-black)]">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Textile Collection Overview
          </h2>
          <p className="text-sm md:text-base max-w-2xl mx-auto">
            Discover authentic handcrafted textiles, showcasing traditional
            techniques, premium fabrics, and timeless craftsmanship.
          </p>
        </div>

        {/* Filter + Search */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <FilterDropdown
              options={orchardTypes}
              onSelect={(val) => setFilterType(val)}
            />

            <SecondarySearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full sm:w-72"
            />
          </div>
        </section>

        {/* Textile Cards */}
        <section className="my-10">
          {filtered?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {filtered?.map((o) => (
                <article
                  key={o.id}
                  className="relative flex flex-col rounded-md border overflow-hidden hover:shadow-lg transition"
                >
                  <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded bg-white/90 text-[var(--color-black)] shadow">
                    {o.status}
                  </span>

                  <img
                    src={o.image}
                    alt={o.name}
                    className="w-full h-52 sm:h-56 md:h-60 object-cover"
                  />

                  <div className="flex flex-col flex-grow p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-semibold text-[var(--color-primary)]">
                        {o.name}
                      </h3>
                      <Link to={`/orchards/${o.id}`}>
                        <button className="text-xs font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary-hover)] transition">
                          View Details →
                        </button>
                      </Link>
                    </div>

                    <p className="text-xs mb-1">
                      {o.type} • {o.location}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Fabric Size:</span>{" "}
                      {o.totalLand} {o.landUnit}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Techniques:</span>{" "}
                      {o.varieties.join(", ")}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--color-gray)] mt-10">
              No textile products found matching your criteria.
            </p>
          )}
        </section>

        {/* Additional Sections */}
        <div className="my-12">
          <OrchardContent />
        </div>

        {/* <div className="mt-12">
          <OrchardsSummary orchards={filtered} />
        </div> */}
      </div>
    </ContentWrapper>
  );
}
