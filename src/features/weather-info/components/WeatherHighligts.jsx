import { Eye, Gauge, Sunrise, Sunset, Zap, Wind } from "lucide-react";

export default function WeatherHighlights() {
  const highlights = [
    { icon: <Eye className="text-[var(--color-secondary)]" size={26} />, label: "Visibility", value: "10 km" },
    { icon: <Gauge className="text-[var(--color-secondary)]" size={26} />, label: "Pressure", value: "1012 hPa" },
    { icon: <Sunrise className="text-[var(--color-secondary)]" size={26} />, label: "Sunrise", value: "06:12 AM" },
    { icon: <Sunset className="text-[var(--color-secondary)]" size={26} />, label: "Sunset", value: "06:48 PM" },
    { icon: <Zap className="text-[var(--color-secondary)]" size={26}/>, label: "UV Index", value: "5(Moderate)" },
    { icon: <Wind className="text-[var(--color-secondary)]" size={26}/>, label: "Air Quality", value: "Good(42AQI)" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-6 mt-8 sm:mt-10">
      {highlights.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center backdrop-blur-md rounded-xl shadow-sm p-3 sm:p-4">
          {item.icon}
          <span className="text-xs sm:text-sm mt-2 text-[var(--color-black)]">{item.label}</span>
          <p className="text-sm sm:text-lg font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
