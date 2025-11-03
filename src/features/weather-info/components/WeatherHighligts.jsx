import { Eye, Gauge, Sunrise, Sunset, Zap } from "lucide-react";

export default function WeatherHighlights({
  visibility,
  pressure,
  sunrise,
  sunset,
  uv,
}) {
  const highlights = [
    {
      icon: <Eye className="text-[var(--color-secondary)]" size={26} />,
      label: "Visibility",
      value: `${visibility} km`,
    },
    {
      icon: <Gauge className="text-[var(--color-secondary)]" size={26} />,
      label: "Pressure",
      value: `${pressure} hPa`,
    },
    {
      icon: <Sunrise className="text-[var(--color-secondary)]" size={26} />,
      label: "Sunrise",
      value: sunrise,
    },
    {
      icon: <Sunset className="text-[var(--color-secondary)]" size={26} />,
      label: "Sunset",
      value: sunset,
    },
    {
      icon: <Zap className="text-[var(--color-secondary)]" size={26} />,
      label: "UV Index",
      value: uv,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-6 mt-8 sm:mt-10 italic">
      {highlights.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center backdrop-blur-md rounded-xl p-3 sm:p-4 border border-sm"
        >
          {item.icon}
          <span className="text-xs sm:text-sm mt-2 text-[var(--color-black)]">
            {item.label}
          </span>
          <p className="text-sm sm:text-lg font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
