import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  User2,
  Layers,
  Shirt,
  Package,
} from "lucide-react";
import { Landscape } from "@mui/icons-material";
import ContentWrapper from "@/components/shared/ContentWrapper";
import MapBox from "@/components/ui/MapBox";
import useIsMobile from "@/hooks/useInMobile";

const textiles = [
  {
    id: 1,
    name: "Kashmir Pashmina Weaves",
    type: "Pashmina",
    location: "Srinagar, Kashmir",
    totalLand: 2.5,
    landUnit: "looms",
    varieties: ["Hand-spun", "Handwoven", "Pure Cashmere"],
    status: "Active",
    images: [
      "/assets/images/handiCraftImages/textiles/pashmina/img1.webp",
      "/assets/images/handiCraftImages/textiles/pashmina/img1.webp",
    ],
    technique: "Handloom Weaving",
    established: "1998",
    owner: "Mr. Yousuf",
    production: "3,000 shawls/year",
  },
  {
    id: 2,
    name: "Traditional Kani Shawls",
    type: "Kani",
    location: "Budgam, Kashmir",
    totalLand: 1.8,
    landUnit: "looms",
    varieties: ["Floral Kani", "Geometric Kani"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/kani shawl/img1.webp",
      "/assets/images//handiCraftImages/textiles/kani shawl/img2.webp",
    ],
    technique: "Needle & Loom Kani Weaving",
    established: "2001",
    owner: "Mr. Farooq",
    production: "1,200 shawls/year",
  },
  {
    id: 3,
    name: "Handloom Woolen Rugs",
    type: "Wool Rug",
    location: "Anantnag, Kashmir",
    totalLand: 3,
    landUnit: "units",
    varieties: ["Gabbeh", "Namda Inspired"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/woolen rungs/img1.jpg",
      "/assets/images//handiCraftImages/textiles/woolen rungs/img2.jpg",
    ],
    technique: "Hand Tufted Weaving",
    established: "2007",
    owner: "Ms. Rubina",
    production: "4,500 rugs/year",
  },
  {
    id: 4,
    name: "Silk Ikat Studio",
    type: "Ikat",
    location: "Hyderabad, India",
    totalLand: 4,
    landUnit: "looms",
    varieties: ["Single Ikat", "Double Ikat"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/silk ekat/img1.webp",
      "/assets/images//handiCraftImages/textiles/silk ekat/img2.webp",
    ],
    technique: "Resist Dye Ikat",
    established: "1995",
    owner: "Mr. Srinivas",
    production: "6,000 meters/year",
  },
  {
    id: 5,
    name: "Banarasi Silk House",
    type: "Silk",
    location: "Varanasi, India",
    totalLand: 6,
    landUnit: "looms",
    varieties: ["Katan", "Organza", "Jamawar"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/Banarasi silk/img1.jpg",
      "/assets/images//handiCraftImages/textiles/Banarasi silk/img2.jpg",
    ],
    technique: "Jacquard Handloom",
    established: "1985",
    owner: "Mr. Ramesh",
    production: "5,500 sarees/year",
  },
  {
    id: 6,
    name: "Kutch Ajrakh Prints",
    type: "Ajrakh",
    location: "Kutch, Gujarat",
    totalLand: 2,
    landUnit: "workshops",
    varieties: ["Indigo Ajrakh", "Red Ajrakh"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/ajrakh print/img1.jpg",
      "/assets/images//handiCraftImages/textiles/ajrakh print/img2.jpg",
    ],
    technique: "Natural Dye Block Printing",
    established: "2005",
    owner: "Ms. Ayesha",
    production: "12,000 meters/year",
  },
  {
    id: 7,
    name: "Bagru Block Prints",
    type: "Block Print",
    location: "Jaipur, Rajasthan",
    totalLand: 3,
    landUnit: "workshops",
    varieties: ["Floral", "Ethnic Motifs"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/bagru prints/img1.jpg",
      "/assets/images//handiCraftImages/textiles/bagru prints/img2.jpg",
    ],
    technique: "Hand Block Printing",
    established: "2010",
    owner: "Mr. Mahesh",
    production: "9,000 meters/year",
  },
  {
    id: 8,
    name: "Chanderi Looms",
    type: "Chanderi",
    location: "Madhya Pradesh, India",
    totalLand: 5,
    landUnit: "looms",
    varieties: ["Silk Cotton", "Pure Silk"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/chandrina loom/img1.webp",
      "/assets/images//handiCraftImages/textiles/chandrina loom/img2.webp",
    ],
    technique: "Traditional Handloom",
    established: "1992",
    owner: "Ms. Kavita",
    production: "4,800 sarees/year",
  },
  {
    id: 9,
    name: "Bhagalpuri Silk Cluster",
    type: "Tussar Silk",
    location: "Bhagalpur, Bihar",
    totalLand: 4.5,
    landUnit: "looms",
    varieties: ["Raw Silk", "Matka Silk"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/bagalpuri silk/img1.webp",
      "/assets/images//handiCraftImages/textiles/bagalpuri silk/img2.webp",
    ],
    technique: "Wild Silk Weaving",
    established: "1999",
    owner: "Mr. Ajit",
    production: "7,200 meters/year",
  },
  {
    id: 10,
    name: "Lambani Embroidery Hub",
    type: "Embroidery",
    location: "Karnataka, India",
    totalLand: 2,
    landUnit: "units",
    varieties: ["Mirror Work", "Thread Embroidery"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/lambani emboidery/img1.jpg",
      "/assets/images//handiCraftImages/textiles/lambani emboidery/img2.webp",
    ],
    technique: "Hand Embroidery",
    established: "2008",
    owner: "Ms. Sunita",
    production: "2,500 pieces/year",
  },
  {
    id: 11,
    name: "Kalamkari Art Studio",
    type: "Kalamkari",
    location: "Andhra Pradesh, India",
    totalLand: 3,
    landUnit: "workshops",
    varieties: ["Hand-painted", "Block Kalamkari"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/kalamkari/img1.jpg",
      "/assets/images//handiCraftImages/textiles/lambani emboidery/img1.jpg",
    ],
    technique: "Natural Dye Painting",
    established: "2003",
    owner: "Mr. Prasad",
    production: "6,000 panels/year",
  },
  {
    id: 12,
    name: "Paithani Weaves",
    type: "Paithani",
    location: "Maharashtra, India",
    totalLand: 2.5,
    landUnit: "looms",
    varieties: ["Peacock Motif", "Lotus Motif"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/pathani weaves/img1.webp",
      "/assets/images//handiCraftImages/textiles/pathani weaves/img2.webp",
    ],
    technique: "Silk Zari Handloom",
    established: "1988",
    owner: "Mr. Deshmukh",
    production: "1,800 sarees/year",
  },
  {
    id: 13,
    name: "Assam Muga Silk",
    type: "Muga Silk",
    location: "Assam, India",
    totalLand: 3.2,
    landUnit: "looms",
    varieties: ["Golden Silk"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/Assam moga silk/img1.webp",
      "/assets/images//handiCraftImages/textiles/Assam moga silk/img2.webp",
    ],
    technique: "Traditional Silk Weaving",
    established: "1990",
    owner: "Mr. Hazarika",
    production: "2,200 meters/year",
  },
  {
    id: 14,
    name: "Himachal Wool Shawls",
    type: "Wool Shawl",
    location: "Kullu, Himachal Pradesh",
    totalLand: 2,
    landUnit: "units",
    varieties: ["Striped", "Traditional Motifs"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/himachal wool/img1.jpg",
      "/assets/images//handiCraftImages/textiles/himachal wool/img2.jpg",
    ],
    technique: "Hand Spinning & Weaving",
    established: "1996",
    owner: "Ms. Neelam",
    production: "3,000 shawls/year",
  },
  {
    id: 15,
    name: "Eri Silk Collective",
    type: "Eri Silk",
    location: "Meghalaya, India",
    totalLand: 2.8,
    landUnit: "looms",
    varieties: ["Peace Silk"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/eri silk/img1.webp",
      "/assets/images//handiCraftImages/textiles/eri silk/img2.webp",
    ],
    technique: "Ahimsa Silk Weaving",
    established: "2004",
    owner: "Mr. Sangma",
    production: "2,600 meters/year",
  },
  {
    id: 16,
    name: "Pochampally Ikat Weaves",
    type: "Ikat",
    location: "Telangana, India",
    totalLand: 4,
    landUnit: "looms",
    varieties: ["Geometric Ikat", "Diamond Ikat"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/pochampali/img1.jpg",
      "/assets/images//handiCraftImages/textiles/pochampali/img2.jpg",
    ],
    technique: "Double Ikat",
    established: "1994",
    owner: "Mr. Raju",
    production: "7,800 meters/year",
  },
  {
    id: 17,
    name: "Toda Embroidery Textiles",
    type: "Toda Embroidery",
    location: "Tamil Nadu, India",
    totalLand: 1.5,
    landUnit: "units",
    varieties: ["Red & Black Motifs"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/toda/img1.webp",
      "/assets/images//handiCraftImages/textiles/toda/img2.webp",
    ],
    technique: "Hand Embroidery",
    established: "2006",
    owner: "Ms. Lakshmi",
    production: "1,200 pieces/year",
  },
  {
    id: 18,
    name: "Odisha Sambalpuri",
    type: "Sambalpuri",
    location: "Odisha, India",
    totalLand: 3.5,
    landUnit: "looms",
    varieties: ["Traditional Motifs", "Modern Patterns"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/odisa sambalpuri/img1.jpg",
      "/assets/images//handiCraftImages/textiles/odisa sambalpuri/img2.jpg",
    ],
    technique: "Bandha Tie-Dye",
    established: "1991",
    owner: "Mr. Patra",
    production: "4,200 sarees/year",
  },
  {
    id: 19,
    name: "Mangalgiri Cotton Looms",
    type: "Cotton",
    location: "Andhra Pradesh, India",
    totalLand: 4,
    landUnit: "looms",
    varieties: ["Fine Cotton", "Handwoven Cotton"],
    status: "Active",
    images: [
      "/assets/images//handiCraftImages/textiles/MAngalgiri/img1.webp",
      "/assets/images//handiCraftImages/textiles/MAngalgiri/img2.jpg",
    ],
    technique: "Handloom Cotton Weaving",
    established: "2000",
    owner: "Mr. Naresh",
    production: "10,000 meters/year",
  },
];

const SingleTextileDetails = () => {
  const { id } = useParams();
  const textile = textiles.find((t) => t.id === Number(id));
  const isMobile = useIsMobile();

  if (!textile) {
    return (
      <ContentWrapper>
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-gray-700">
            Textile unit not found
          </h2>
          <Link
            to="/textiles"
            className="text-[var(--color-secondary)] mt-4 inline-block hover:text-[var(--color-primary-hover)] transition"
          >
            ← Back to Textiles
          </Link>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper topSpacing compactScreen>
      <div className="w-full min-h-screen bg-[var(--color-white)] flex flex-col items-center gap-12">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10">
          <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4">
            {textile.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${textile.name} ${index + 1}`}
                className="w-full aspect-[4/3] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col justify-center gap-6">
            <h1 className="text-2xl font-bold">{textile.name}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <Info
                icon={<MapPin />}
                label="Location"
                value={textile.location}
              />
              <Info
                icon={<Shirt />}
                label="Textile Type"
                value={textile.type}
              />
              <Info
                icon={<Landscape />}
                label="Production Units"
                value={`${textile.totalLand} ${textile.landUnit}`}
              />
              <Info
                icon={<Layers />}
                label="Technique"
                value={textile.technique}
              />
              <Info
                icon={<CalendarDays />}
                label="Established"
                value={textile.established}
              />
              <Info icon={<User2 />} label="Owner" value={textile.owner} />
              <Info
                icon={<Package />}
                label="Annual Production"
                value={textile.production}
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Section title="Fabric & Weave Variants">
            <ul className="list-disc space-y-2 text-[var(--color-black)] text-sm font-medium sm:text-base">
              {textile.varieties.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </Section>

          <Section title="Workshop Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
              <div className="p-4 border rounded-sm bg-white shadow-sm">
                <p className="font-semibold">Visiting Hours</p>
                <p className="opacity-80">10:00 AM – 5:00 PM</p>
              </div>
              <div className="p-4 border rounded-sm bg-white shadow-sm">
                <p className="font-semibold">Workshop Fee</p>
                <p className="opacity-80">₹150 per person</p>
              </div>
              <div className="p-4 border rounded-sm bg-white shadow-sm">
                <p className="font-semibold">Experiences</p>
                <p className="opacity-80">Live weaving, artisan interaction</p>
              </div>
              <div className="p-4 border rounded-sm bg-white shadow-sm">
                <p className="font-semibold">Contact</p>
                <p className="opacity-80">+91 98765 43210</p>
              </div>
            </div>
          </Section>
        </div>

        <div className="text-center mb-10">
          <Link
            to="/orchards"
            className="inline-block text-[var(--color-secondary)] hover:text-[var(--color-primary-hover)] font-medium transition"
          >
            ← Back to Textiles
          </Link>
        </div>

        <div className="w-full max-w-6xl">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-[var(--color-secondary)] w-6 h-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-black)]">
              Location
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
            <MapBox address={textile.location} />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

const Info = ({ label, value, icon }) => (
  <div className="flex items-start sm:items-center gap-2 text-[var(--color-black)] text-sm sm:text-base">
    <span className="text-[var(--color-secondary)]">{icon}</span>
    <div>
      <span className="font-semibold">{label}: </span>
      <span className="opacity-80">{value}</span>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="p-6 bg-[var(--color-green)] border rounded-sm">
    <h2 className="text-lg sm:text-xl font-semibold mb-3 border-b pb-1">
      {title}
    </h2>
    {children}
  </div>
);

export default SingleTextileDetails;
