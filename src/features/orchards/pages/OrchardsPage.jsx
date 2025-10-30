// import ContentWrapper from "@/components/shared/ContentWrapper";
// import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
// import React, { useState, useMemo } from "react";
// import OrchardsSummary from "../components/OrchardsSummary";
// import { Link } from "react-router-dom";
// import OrchardContent from "./OrchardContent";
// import { TreePine } from "lucide-react";
// import SelectField from "@/components/shared/custom-inputs/SelectField";
// import CustomSelect from "@/components/shared/CustomSelect";

// export default function OrchardsPage() {
//   const sample = [
//     {
//       id: 1,
//       name: "Apple Valley ",
//       type: "Apple",
//       location: "Kashmir India",
//       totalLand: 12.5,
//       landUnit: "acres",
//       varieties: ["Honeycrisp", "Royal Gala","Maharaji","Ambri"],
//       status: "Sowing",
//       image:
//         "https://images.unsplash.com/photo-1607358049845-4360f06be5b7?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
//     },
//     {
//       id: 2,
//       name: " Walnut Farm",
//       type: "Walnut",
//       location: "Kashmir, India",
//       totalLand: 20,
//       landUnit: "acres",
//       varieties: ["Chandler","Pedro", "Local Kashmir Walnut (Desi)"],
//       status: "Harvesting",
//       image:
//         "https://images.unsplash.com/photo-1627371827420-2d1cda3b6a81?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
//     },
//     {
//       id: 3,
//       name: "Peach Paradise",
//       type: "Peach",
//       location: "Nainital, India",
//       totalLand: 10,
//       landUnit: "acres",
//       varieties: ["Elberta", "Redhaven"],
//       status: "Sowing",
//       image:
//         "https://plus.unsplash.com/premium_photo-1661822856704-c061ba5e94da?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
//     },
//     {
//       id: 4,
//       name: "Cherry Orchards",
//       type: "Cherry",
//       location: "Shimla, India",
//       totalLand: 6,
//       landUnit: "acres",
//       varieties: ["Bing", "Rainier"],
//       status: "Harvesting",
//       image:
//         "https://plus.unsplash.com/premium_photo-1661843593682-facc94cf9f33?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
//     },
//     {
//       id: 5,
//       name: "Almond Grove",
//       type: "Almond",
//       location: "Maharashtra, India",
//       totalLand: 15,
//       landUnit: "acres",
//       varieties: ["Nonpareil", "Carmel"],
//       status: "Sowing",
//       image:
//         "https://images.unsplash.com/photo-1709618526707-4d7ac66c8180?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
//     },
//     {
//       id: 6,
//       name: "Apple Valley ",
//       type: "Apple",
//       location: "Himachal Pradesh, India",
//       totalLand: 12.5,
//       landUnit: "acres",
//       varieties: ["Honeycrisp", "Royal Gala"],
//       status: "Idle",
//       image:
//         "https://images.unsplash.com/photo-1607358049845-4360f06be5b7?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
//     },
//     {
//       id: 7,
//       name: " Walnut Farm",
//       type: "Walnut",
//       location: "Kashmir, India",
//       totalLand: 20,
//       landUnit: "acres",
//       varieties: ["Chandler", "Pedro", "Local Kashmir Walnut (Desi)"],
//       status: "Idle",
//       image:
//         "https://images.unsplash.com/photo-1627371827420-2d1cda3b6a81?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
//     },
//     {
//       id: 8,
//       name: "Almond Grove",
//       type: "Almond",
//       location: "Maharashtra, India",
//       totalLand: 15,
//       landUnit: "acres",
//       varieties: ["Nonpareil", "Carmel"],
//       status: "Sowing",
//       image:
//         "https://images.unsplash.com/photo-1709618526707-4d7ac66c8180?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
//     },
//     {
//       id: 9,
//       name: "Apple Valley ",
//       type: "Apple",
//       location: "Himachal Pradesh, India",
//       totalLand: 12.5,
//       landUnit: "acres",
//       varieties: ["Honeycrisp", "Royal Gala"],
//       status: "Idle",
//       image:
//         "https://images.unsplash.com/photo-1607358049845-4360f06be5b7?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
//     },
//     {
//       id: 10,
//       name: " Walnut Farm",
//       type: "Walnut",
//       location: "Kashmir, India",
//       totalLand: 20,
//       landUnit: "acres",
//       varieties: ["Chandler", "Pedro", "Local Kashmir Walnut (Desi)"],
//       status: "Idle",
//       image:
//         "https://images.unsplash.com/photo-1627371827420-2d1cda3b6a81?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
//     },
//   ];

//   const [orchards] = useState(() => sample);
//   const [query, setQuery] = useState("");
//   const [filterType, setFilterType] = useState("All");

//   const orchardTypes = useMemo(() => {
//     const setT = new Set(orchards.map((o) => o.type));
//     return ["All", ...Array.from(setT)];
//   }, [orchards]);

//   const filtered = useMemo(() => {
//     return orchards.filter((o) => {
//       const matchesQuery = [o.name, o.location, o.varieties.join(" ")]
//         .join(" ")
//         .toLowerCase()
//         .includes(query.toLowerCase());
//       const matchesType = filterType === "All" ? true : o.type === filterType;
//       return matchesQuery && matchesType;
//     });
//   }, [orchards, query, filterType]);

//   return (
//     <ContentWrapper topSpacing >
//       <div className="p-4 sm:p-6 min-h-screen text-[var(--color-black)] ">
//         <div className="">
//            <div className="text-center mb-10 ">
//           <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-black)] mb-3">
//             Orchard Overview
//           </h2>
//           <p className="text-sm md:text-base  max-w-2xl mx-auto">
//             Our freshly harvested crops are carefully collected from the orchards, 
//             ensuring top quality and freshness in every batch.
//           </p>
//         </div>
//           <section className="mb-6  ">
//             <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
//               <div className="flex w-full sm:w-auto gap-3 items-center justify-between sm:justify-start">
//                 <CustomSelect
//                   value={filterType}
//                   onChange={setFilterType}
//                   options={orchardTypes}
//                   className="sm:w-44"
//                 />
//               </div>

//               <div className="w-full sm:w-auto">
//                 <SecondarySearchBar
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   className="w-full md:w-auto"
//                 />
//               </div>
//             </div>
//           </section>





// <section className="px-4 sm:px-6 md:px-8 lg:px-12 my-10">
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//     {filtered.map((o) => (
//       <article
//         key={o.id}
//         className=" flex flex-col overflow-hidden"
//       >
//         {/* Status Badge */}
//         <span className="absolute top-2 left-2 text-[var(--color-black)] text-xs font-semibold px-2 py-1 rounded bg-[var(--color-white)] shadow">
//           {o.status}
//         </span>

        
//         <div className="relative">
//           <img
//             src={o.image}
//             alt={o.name}
//             className="w-full h-52 sm:h-56 md:h-60 object-cover"
//           />
//         </div>

//         {/* Card Content */}
//         <div className="flex flex-col justify-between flex-grow p-4">
//           <div>
//             <h3 className="text-base font-semibold text-[var(--color-primary)] mb-1">
//               {o.name}
//             </h3>
//             <p className="text-xs ">
//               {o.type} • {o.location}
//             </p>

//             <p className="text-sm ">
//               <span className="font-medium">Total Land:</span> {o.totalLand} {o.landUnit}
//             </p>
//             <p className="text-sm mt-1">
//               <span className="font-medium">Varieties:</span>{" "}
//               {o.varieties.join(", ")}
//             </p>
//           </div>

//           {/* Show More Button */}
//           <div className="mt-auto pt-4 flex justify-center">
//             <Link to={`/orchards/${o.id}`}>
//               <button className="text-xs md:text-sm font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary-hover)] transition">
//                 Show More →
//               </button>
//             </Link>
//           </div>
//         </div>
//       </article>
//     ))}
//   </div>
// </section>

          
//               <div >
//                 <OrchardContent/>
//               </div>
//           <div className="mt-10">
//             <OrchardsSummary orchards={filtered} />
//           </div>
//         </div>
//       </div>
      
//     </ContentWrapper>
    
//   );
// }

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import OrchardsSummary from "../components/OrchardsSummary";
import OrchardContent from "./OrchardContent";
import CustomSelect from "@/components/shared/CustomSelect";

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
      image:
        "https://images.unsplash.com/photo-1607358049845-4360f06be5b7?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
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
      name: "Cherry Orchards",
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
  ];

  const [orchards] = useState(() => sample);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const orchardTypes = useMemo(() => {
    const types = new Set(orchards.map((o) => o.type));
    return ["All", ...Array.from(types)];
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
      <div className="min-h-screen  text-[var(--color-black)]">
        
       
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-black)] mb-3">
            Orchard Overview
          </h2>
          <p className="text-sm md:text-base  max-w-2xl mx-auto">
            Our freshly harvested crops are carefully collected from the orchards,
            ensuring top quality and freshness in every batch.
          </p>
        </div>

        
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <CustomSelect
              value={filterType}
              onChange={setFilterType}
              options={orchardTypes}
              className="w-full sm:w-44"
            />

            <SecondarySearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full sm:w-72"
            />
          </div>
        </section>

       
        <section className="my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6  ">
            {filtered.map((o) => (
              <article
                key={o.id}
                className="relative flex flex-col  rounded-sm border overflow-hidden"
              >
                
                <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded bg-white/90 text-[var(--color-black)] shadow">
                  {o.status}
                </span>

               
                <div className="relative">
                  <img
                    src={o.image}
                    alt={o.name}
                    className="w-full h-52 sm:h-56 md:h-60 object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="text-base font-semibold text-[var(--color-primary)] mb-1 border">
                    {o.name}
                  </h3>
                  <p className="text-xs  mb-1">
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

                 
                  <div className="mt-auto pt-4 flex justify-center">
                    <Link to={`/orchards/${o.id}`}>
                      <button className="text-xs md:text-sm font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary-hover)] transition">
                        Show More →
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        
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
