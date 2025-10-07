export default function UpdatesSection({ order }) {
  return (
    <div className="bg-[var(--color-white)] shadow-sm w-full p-4 sm:p-5 text-xs sm:text-sm text-[var(--color-black)]">
      <p className="mb-2 font-medium">Updates sent to</p>
      <p>{order.phone}</p>
      <p>{order.email}</p>
    </div>
  );
}
