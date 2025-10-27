import ContentWrapper from "@/components/shared/ContentWrapper";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import React, { useState, useMemo } from "react";
import OrchardsSummary from "../components/OrchardsSummary";
import { Link } from "react-router-dom";

export default function OrchardsPage() {
  const sample = [
    {
      id: 1,
      name: "Green Valley Orchards",
      type: "Apple",
      location: "Himachal Pradesh, India",
      totalLand: 12.5,
      landUnit: "acres",
      varieties: ["Honeycrisp", "Royal Gala"],
      status: "Sowing",
      image:
        "https://images.unsplash.com/photo-1607358049845-4360f06be5b7?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
    },
    {
      id: 2,
      name: "Mountain Walnut Farm",
      type: "Walnut",
      location: "Kashmir, India",
      totalLand: 20,
      landUnit: "acres",
      varieties: ["Chandler"],
      status: "Harvesting",
      image:
        "https://images.unsplash.com/photo-1627371827420-2d1cda3b6a81?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
    },
    {
      id: 3,
      name: "Peach Paradise",
      type: "Peach",
      location: "Nainital, India",
      totalLand: 10,
      landUnit: "acres",
      varieties: ["Elberta", "Redhaven"],
      status: "Sowing",
      image:
        "https://plus.unsplash.com/premium_photo-1661822856704-c061ba5e94da?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
    },
    {
      id: 4,
      name: "Cherry Hill Orchards",
      type: "Cherry",
      location: "Shimla, India",
      totalLand: 6,
      landUnit: "acres",
      varieties: ["Bing", "Rainier"],
      status: "Harvesting",
      image:
        "https://plus.unsplash.com/premium_photo-1661843593682-facc94cf9f33?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
    },
    {
      id: 5,
      name: "Almond Grove",
      type: "Almond",
      location: "Maharashtra, India",
      totalLand: 15,
      landUnit: "acres",
      varieties: ["Nonpareil", "Carmel"],
      status: "Sowing",
      image:
        "https://images.unsplash.com/photo-1709618526707-4d7ac66c8180?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
    },
    {
      id: 6,
      name: "Green Valley Orchards",
      type: "Apple",
      location: "Himachal Pradesh, India",
      totalLand: 12.5,
      landUnit: "acres",
      varieties: ["Honeycrisp", "Royal Gala"],
      status: "Idle",
      image:
        "https://images.unsplash.com/photo-1607358049845-4360f06be5b7?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
    },
    {
      id: 7,
      name: "Mountain Walnut Farm",
      type: "Walnut",
      location: "Kashmir, India",
      totalLand: 20,
      landUnit: "acres",
      varieties: ["Chandler", "Pedro", "Local Kashmir Walnut (Desi)"],
      status: "Idle",
      image:
        "https://images.unsplash.com/photo-1627371827420-2d1cda3b6a81?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
    },
  ];

  const [orchards] = useState(() => sample);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const orchardTypes = useMemo(() => {
    const setT = new Set(orchards.map((o) => o.type));
    return ["All", ...Array.from(setT)];
  }, [orchards]);

  const filtered = useMemo(() => {
    return orchards.filter((o) => {
      const matchesQuery = [o.name, o.location, o.varieties.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesType = filterType === "All" ? true : o.type === filterType;
      return matchesQuery && matchesType;
    });
  }, [orchards, query, filterType]);

  return (
    <ContentWrapper topSpacing>
      <div className="p-4 sm:p-6 min-h-screen text-[var(--color-black)] ">
        <div className="max-w-7xl mx-auto">
        
          <section className="mb-6 p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            
              <div className="flex w-full sm:w-auto gap-3 items-center justify-between sm:justify-start">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border rounded-sm w-full sm:w-44 text-sm"
                >
                  {orchardTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              
              <div className="w-full sm:w-auto">
                <SecondarySearchBar
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full md:w-auto"
                />
              </div>
            </div>
          </section>

         
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((o) => (
                <article
                  key={o.id}
                  className="rounded-lg border   overflow-hidden relative "
                >
                
                  <span className="absolute top-2 left-2 text-[var(--color-black)] text-xs font-semibold px-2 py-1 rounded bg-[var(--color-white)] shadow">
                    {o.status}
                  </span>

                 
                  <img
                    src={o.image}
                    alt={o.name}
                    className="w-full h-56 sm:h-60 object-cover"
                  />

                  
                  <div className="p-4 flex flex-col justify-between min-h-[180px]">
                  
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-sm font-semibold text-[var(--color-primary)]">
                        {o.name}
                      </h3>
                      <Link to="/orchards/1">
                        <button className="text-xs text-[var(--color-secondary)] hover:text-[var(--color-primary-hover)] transition whitespace-nowrap">
                          Show More Details
                        </button>
                      </Link>
                    </div>

                    
                    <p className="text-xs text-[var(--color-black)] mt-1 whitespace-normal">
                      {o.type} • {o.location}
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-black)]">
                      Total Land: {o.totalLand} {o.landUnit}
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-black)]">
                      Varieties: {o.varieties.join(", ")}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

         
          <div className="mt-10">
            <OrchardsSummary orchards={filtered} />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
