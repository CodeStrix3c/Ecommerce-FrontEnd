import React from "react";

export default function WeatherWeeklyForecast({ forecast }) {
  console.log(forecast, "forecast..");

  return (
    <div className=" text-[var(--color-black)] flex flex-col items-center px-4 sm:px-8 justify-end">
      <div className="w-full max-w-5xl mt-8 sm:mt-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left mb-6">
          3-Day Weather Forecast
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecast.map((day, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-[var(--color-white)] backdrop-blur-lg rounded-2xl shadow-sm p-4 sm:p-5 
                         hover:scale-105 transition-transform text-[var(--color-black)]"
            >
              <span className="text-sm sm:text-base font-semibold">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </span>

              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="mt-3 w-10 h-10"
              />
              <p className="mt-2 text-xs sm:text-sm italic">
                {day.day.condition.text}
              </p>

              <div className="flex gap-1 sm:gap-2 mt-3 text-sm sm:text-base">
                <span className="font-semibold">{day.day.maxtemp_c}°</span>
                <span className="opacity-75">{day.day.mintemp_c}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
