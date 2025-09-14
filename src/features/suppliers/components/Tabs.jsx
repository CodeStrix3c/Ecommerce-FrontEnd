export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ["overview", "documents", "bank"];

  return (
    <div className="border-b flex flex-wrap gap-10 justify-center items-center font-medium">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 px-2 capitalize transition-colors duration-200 ${
            activeTab === tab
              ? "text-[var(--color-secondary)] border-b-2 border-[var(--color-secondary)]"
              : "text-[var(--color-black)] hover:text-[var(--color-primary-hover)]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
