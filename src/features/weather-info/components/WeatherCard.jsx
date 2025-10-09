import React from "react";
import { Cloud, Droplets, ThermometerSun } from "lucide-react";

export default function WeatherCard() {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl flex flex-col items-center text-center">
      <Cloud className="w-20 h-20 text-yellow-300" />
      <h2 className="text-4xl font-bold mt-2">27°C</h2>
      <p className="text-lg text-gray-100">Partly Cloudy</p>
      <p className="text-sm text-gray-300 mt-2">Thursday, 09 Oct 2025</p>
      <div className="flex justify-around w-full mt-4">
        <div className="flex flex-col items-center">
          <ThermometerSun className="text-orange-300" />
          <p className="text-sm">Max: 30°C</p>
        </div>
        <div className="flex flex-col items-center">
          <Droplets className="text-blue-300" />
          <p className="text-sm">Min: 22°C</p>
        </div>
      </div>
    </div>
  );
}
