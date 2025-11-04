import React from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Leaf, TreePine, CalendarDays, User2, Droplet } from "lucide-react";
import { Landscape } from "@mui/icons-material";
import ContentWrapper from "@/components/shared/ContentWrapper";
import MapBox from "@/components/ui/MapBox";
import useIsMobile from "@/hooks/useInMobile";


const orchards = [
 {
    id: 1,
    name: "Apple Valley",
    type: "Apple",
    location: "Kashmir, India",
    totalLand: 12.5,
    landUnit: "acres",
    varieties: ["Honeycrisp", "Royal Gala", "Maharaji", "Ambri"],
    status: "Sowing",
    images: [
  "/assets/images/appleorchard1.jpg",
  "/assets/images/appleorchard2.jpeg"
],
    irrigation: "Drip Irrigation",
    established: "2003",
    owner: "Mr. Ahmad",
    yield: "25 tons",
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
     images: [
  "/assets/images/walnutfarm1.jpeg",
  "/assets/images/walnutfarm2.jpeg"
],
    irrigation: "Canal Irrigation",
    established: "1999",
    owner: "Mr. Bilal",
    yield: "30 tons",
  },
  {
    id: 3,
    name: "Peach Paradise",
    type: "Peach",
    location: "Pulwama, Kashmir",
    totalLand: 10,
    landUnit: "acres",
    varieties: ["Elberta", "Redhaven","Carmel","Makhdoom","Waris","Pranyaj"],
    status: "Sowing",
    images: [
  "/assets/images/peachorchard1.jpg",
  "/assets/images/peachorchard2.jpg"
],
    irrigation: "Sprinkler System",
    established: "2010",
    owner: "Ms. Fatima",
    yield: "12 tons",
  },
  {
    id: 4,
    name: "Cherry Paradise",
    type: "Cherry",
    location: "Shopian, Kashmir",
    totalLand: 8,
    landUnit: "acres",
    varieties: ["Bing", "Rainier","Makhmali","Mishri","Double"],
    status: "Harvesting",
     images: [
  "/assets/images/cherryorchard1.jpg",
  "/assets/images/cherryorchard2.jpg"
],
    irrigation: "Sprinkler System",
    established: "2008",
    owner: "Mr. Khan",
    yield: "14 tons",
  },
  {
    id: 5,
    name: "Almond Grove",
    type: "Almond",
    location: "Pulwama, Kashmir",
    totalLand: 15,
    landUnit: "acres",
    varieties: ["Nonpareil", "Carmel","Makhdoom","Waris","Pranyaj"],
    status: "Sowing",
     images: [
  "/assets/images/almondfarm1.jpg",
  "/assets/images/almondfarm2.jpg"
],
    irrigation: "Sprinkler System",
    established: "2012",
    owner: "Ms. Zahra",
    yield: "18 tons",
  },
  
];

const SingleOrchardDetails = () => {
  const { id } = useParams();
  const orchard = orchards.find((o) => o.id === Number(id));
  const isMobile = useIsMobile();

  if (!orchard) {
    return (
      <ContentWrapper>
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-gray-700">Orchard not found</h2>
          <Link
            to="/orchards"
            className="text-[var(--color-secondary)] mt-4 inline-block hover:text-[var(--color-primary-hover)] transition"
          >
            ← Back to Orchards
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
  {orchard.images.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`${orchard.name} ${index + 1}`}
      className="w-full aspect-[4/3] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
    />
  ))}
</div>


          
          <div className="flex-1 flex flex-col justify-center gap-6">
            <h1 className="text-2xl font-bold">{orchard.name}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <Info icon={<MapPin />} label="Location" value={orchard.location} />
              <Info icon={<Leaf />} label="Crop Type" value={orchard.type} />
              <Info icon={<Landscape />} label="Cultivated Area" value={`${orchard.totalLand} ${orchard.landUnit}`} />
              <Info icon={<Droplet />} label="Irrigation" value={orchard.irrigation} />
              <Info icon={<CalendarDays />} label="Established" value={orchard.established} />
              <Info icon={<User2 />} label="Owner" value={orchard.owner} />
              <Info icon={<TreePine />} label="Annual Yield" value={orchard.yield} />
            </div>
          </div>
        </div>

        
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Section title="Crop Varieties">
            <ul className="list-disc space-y-2 text-[var(--color-black)] text-sm sm:text-base">
              {orchard.varieties.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </Section>

          <Section title="Visitor Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 text-sm sm:text-base">
              <div className="p-4">
                <p className="font-semibold">Visiting Hours</p>
                <p className="opacity-80">9:00 AM – 6:00 PM</p>
              </div>
              <div className="p-4">
                <p className="font-semibold">Entry Fee</p>
                <p className="opacity-80">₹100 per person</p>
              </div>
              <div className="p-4">
                <p className="font-semibold">Activities</p>
                <p className="opacity-80">Guided tours, fruit picking</p>
              </div>
              <div className="p-4">
                <p className="font-semibold">Contact</p>
                <p className="opacity-80">+91 97657 89000</p>
              </div>
            </div>
             <div className="text-center mb-10">
          
        </div>
        
          </Section>
        </div>
       
        <div className="text-center mb-10">
          <Link
            to="/orchards"
            className="inline-block text-[var(--color-secondary)] hover:text-[var(--color-primary-hover)] font-medium transition"
          >
            ← Back to Orchards
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
            <MapBox address={orchard.location} />
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
  <div className="p-6 bg-[var(--color-white)] border">
    <h2 className="text-lg sm:text-xl font-semibold mb-3 border-b pb-1">{title}</h2>
    {children}
  </div>
);

export default SingleOrchardDetails;
