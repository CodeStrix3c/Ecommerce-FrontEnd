export default function SidebarItem({ icon, label, onClick }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[var(--color-primary-hover)]/10 transition"
      onClick={onClick}
    >
      {icon}
      <span className="font-medium text-[var(--color-black)]">{label}</span>
    </div>
  );
}
