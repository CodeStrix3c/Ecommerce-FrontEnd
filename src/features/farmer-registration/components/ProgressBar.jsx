export default function ProgressBar({ completion }) {
  return (
    <>
      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
        <div
          className="bg-[var(--color-primary)] h-1 transition-all"
          style={{ width: `${completion}%` }}
        ></div>
      </div>
      <p className="text-center text-xs text-gray-500">
        {completion}% completed
      </p>
    </>
  );
}
