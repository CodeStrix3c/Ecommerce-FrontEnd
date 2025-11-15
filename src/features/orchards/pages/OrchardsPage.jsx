import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import OrchardsSummary from "../components/OrchardsSummary";
import OrchardContent from "./OrchardContent";
import FilterDropdown from "@/components/shared/FilterDropDown";

export default function OrchardsPage() {
  const sample = [
    {
      id: 1,
      name: "Apple Valley",
      type: "Apple",
      location: "Kashmir, India",
      totalLand: 12.5,
      landUnit: "acres",
      varieties: ["Honeycrisp", "Royal Gala", "Maharaji", "Ambri"],
      status: "Sowing",
      image: "/assets/images/appleOrchard/apple.png",
    },
    {
      id: 2,
      name: "Walnut Farm",
      type: "Walnut",
      location: "Kashmir, India",
      totalLand: 20,
      landUnit: "acres",
      varieties: ["Chandler", "Pedro", "Local Kashmir Walnut (Desi)"],
      status: "Harvesting",
      image: "/assets/images/wallnutOrchard/walnut.png",
    },
    {
      id: 3,
      name: "Peach Paradise",
      type: "Peach",
      location: "Pulwama, Kashmir",
      totalLand: 10,
      landUnit: "acres",
      varieties: ["Elberta", "Redhaven", "Makhdoom", "Waris", "Pranyaj"],
      status: "Sowing",
      image: "/assets/images/peachOrchard/peach.png",
    },
    {
      id: 4,
      name: "Cherry Orchards",
      type: "Cherry",
      location: "Shopian, Kashmir",
      totalLand: 6,
      landUnit: "acres",
      varieties: ["Bing", "Rainier", "Makhmali", "Mishri", "Double"],
      status: "Harvesting",
      image: "/assets/images/cherryOrchard/cherry1.png",
    },
    {
      id: 5,
      name: "Almond Grove",
      type: "Almond",
      location: "Kashmir, India",
      totalLand: 15,
      landUnit: "acres",
      varieties: ["Nonpareil", "Carmel"],
      status: "Sowing",
      image: "/assets/images/almondfarm2.jpg",
    },
  ];

  const [orchards] = useState(sample);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Dynamically generate dropdown options from orchard types
  const orchardTypes = useMemo(() => {
    const types = Array.from(new Set(orchards.map((o) => o.type)));
    return [
      { value: "All", label: "All" },
      ...types.map((t) => ({ value: t, label: t })),
    ];
  }, [orchards]);

  // Filtering logic
  const filtered = useMemo(() => {
    return orchards.filter((o) => {
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
            Orchard Overview
          </h2>
          <p className="text-sm md:text-base max-w-2xl mx-auto">
            Our freshly harvested crops are carefully collected from the
            orchards, ensuring top quality and freshness in every batch.
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

        {/* Orchard Cards */}
        <section className="my-10">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {filtered.map((o) => (
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
                          Show More →
                        </button>
                      </Link>
                    </div>

                    <p className="text-xs mb-1">
                      {o.type} • {o.location}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Total Land:</span>{" "}
                      {o.totalLand} {o.landUnit}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Varieties:</span>{" "}
                      {o.varieties.join(", ")}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--color-gray)] mt-10">
              No orchards found matching your criteria.
            </p>
          )}
        </section>

        {/* Additional Sections */}
        <div className="my-12">
          <OrchardContent />
        </div>

        <div className="mt-12">
          <OrchardsSummary orchards={filtered} />
        </div>
      </div>
    </ContentWrapper>
  );
}
