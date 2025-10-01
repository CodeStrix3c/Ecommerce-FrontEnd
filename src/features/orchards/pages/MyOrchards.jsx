import { useState } from "react";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import { MoreVertical, Edit, Trash2, X } from "lucide-react";
import OrchardBottom from "@/components/shared/OrchardBottom";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { Link } from "react-router-dom";

const cardsData = [
  {
    Title: "Apple",
    variety: "kullu",
    Location: "pulwama",
    Acres: "10 acres",
    Trees: "100 Trees",
    Details: "View Details",
    image:
      "https://media.istockphoto.com/id/2183999220/photo/rolling-soybean-field-with-red-barn-central-wisconsin.webp?a=1&b=1&s=612x612&w=0&k=20&c=PRrck7ACz14UT20RfBTD5Coyb6W7zdKd_7zc1JLfceI=",
  },
  {
    Title: "Walnuts",
    variety: "california",
    Location: "pulwama",
    Acres: "10 acres",
    Trees: "200 Trees",
    Details: "View Details",
    image:
      "https://t3.ftcdn.net/jpg/05/06/30/80/360_F_506308027_CDz21VQ7ed6seYBiFElgoTnWdc5I2plg.jpg",
  },
  {
    Title: "Apricot",
    variety: "ladakh",
    Location: "pulwama",
    Acres: "10 acres",
    Trees: "200 Trees",
    Details: "View Details",
    image:
      "https://images.pexels.com/photos/1574547/pexels-photo-1574547.jpeg?cs=srgb&dl=pexels-jplenio-1574547.jpg&fm=jpg",
  },
];

const OrchardsPage = () => {
  const [menuOpen, setMenuOpen] = useState(cardsData.map(() => false));
  const [selectedFruit, setSelectedFruit] = useState("");

  const toggleMenu = (index) => {
    const newMenuOpen = [...menuOpen];
    newMenuOpen[index] = !newMenuOpen[index];
    setMenuOpen(newMenuOpen);
  };

  const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "walnut", label: "Walnut" },
    { value: "apricot", label: "Apricot" },
  ];

  return (
    <ContentWrapper>

      <div className="pt-16 md:pt-40">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 w-full">
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              name="fruits"
              label="All Fruits"
              options={fruitOptions}
              value={selectedFruit}
              onChange={(e) => setSelectedFruit(e.target.value)}
              showOptionalLabel={false}
              optional
            />
            <SelectField
              name="fruits2"
              label="All Fruits"
              options={fruitOptions}
              value={selectedFruit}
              onChange={(e) => setSelectedFruit(e.target.value)}
              showOptionalLabel={false}
              optional
            />
          </div>

          {/* Right side: Search bar */}
          <div className="w-full justify-self-end">
            <SecondarySearchBar className="flex w-full justify-end" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 pt-4">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
            >
              <img
                className="w-full h-48 sm:h-60 object-cover"
                src={card.image}
                alt={card.Title}
              />
              <div className="absolute top-3 left-3">
                <p className="px-3 py-1 text-xs sm:text-sm font-semibold bg-[var(--color-black-hover)] text-[var(--color-primary)] rounded-lg shadow-md">
                  Growing Button
                </p>
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleMenu(index)}
                  className="p-2 rounded-full bg-[var(--color-black-hover)] text-black shadow"
                >
                  <MoreVertical size={20} />
                </button>

                {menuOpen[index] && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-10">
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <Edit size={18} /> Edit
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100">
                      <Trash2 size={18} /> Delete
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <X size={18} /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4">
               
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-[var(--color-black)]">
                      {card.Title}
                    </h3>
                    <p className="text-xs text-[var(--color-secondary)] bg-[var(--color-black-hover)] border rounded-lg px-2 py-1">
                      {card.variety}
                    </p>
                  </div>
                  <p className="text-sm text-[var(--color-black)] mt-1">
                    {card.Location}
                  </p>
                </div>

            
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-[var(--color-black)]">
                    {card.Acres}
                  </p>
                  <Link
                    to={"/orchards/1"}
                    className="text-sm text-[var(--color-primary)]"
                  >
                    View Details
                  </Link>
                </div>

                
                <div className="flex justify-center mt-2">
                  <p className="text-sm text-gray-600">{card.Trees}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <OrchardBottom />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default OrchardsPage;
