export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    
    { id: "land", label: "Land Demographics" },
    { id: "holdings", label: "Land Holdings" },
    { id: "address", label: "Address" },
    { id: "media", label: "Gallery & Media" },


  ];

  return (
    <div className="border-b border-gray-200">
      <nav
        className="flex overflow-x-auto sm:overflow-visible space-x-4 sm:space-x-6 justify-start sm:justify-center items-center scrollbar-hide"
        aria-label="Tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap py-3 px-2 sm:px-4 border-b-2 font-medium text-sm sm:text-base transition-colors duration-200 ${
              activeTab === tab.id
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
