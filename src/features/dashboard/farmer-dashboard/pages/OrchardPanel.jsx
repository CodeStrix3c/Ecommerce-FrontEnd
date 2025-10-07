import CustomBarChart from '@/components/charts/CustomBarChart';
import CustomLineChart from '@/components/charts/CustomLineChart';
import { Gauge, Sprout, Tractor, Trees } from 'lucide-react';
import React from 'react';


export default function OrchardPanel() {
  const pHData = [
    { month: "Jan", value: 6.5 },
    { month: "Feb", value: 6.8 },
    { month: "Mar", value: 6.4 },
    { month: "Apr", value: 6.7 },
  ];
 
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-black)]">
              Orchard Profile
            </h1>
            <p className="text-sm text-[var(--color-black)] mt-1">
              Overview of area, planting, survival & yield metrics
            </p>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <div className="p-4 sm:p-5 border  flex items-center gap-3 sm:gap-4 bg-[var(--color-white)]">
            <div className="p-3 rounded-md ">
              <Tractor className="w-8 h-8 text-[var(--color-secondary)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-black)]">Total Orchard Area</p>
              <h2 className="text-2xl font-semibold">55 Kanals</h2>
            </div>
          </div>

          <div className="p-4 sm:p-5 border flex items-center gap-3 sm:gap-4  bg-[var(--color-white)]">
            <div className="p-3 rounded-md">
              <Trees className="w-8 h-8 text-[var(--color-secondary)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-black)]">Plant Density</p>
              <h2 className="text-2xl font-semibold">90 trees</h2>
            </div>
          </div>

          <div className="p-4 sm:p-5 border  flex items-center gap-3 sm:gap-4  bg-[var(--color-white)]">
            <div className="p-3 rounded-md">
              <Gauge className="w-8 h-8 text-[var(--color-secondary)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-black)]">Survival Rate</p>
              <h2 className="text-2xl font-semibold">5%</h2>
            </div>
          </div>

          <div className="p-4 sm:p-5 border s flex items-center gap-3 sm:gap-4  bg-[var(--color-white)]">
            <div className="p-3 rounded-md">
              <Sprout className="w-8 h-8 text-[var(--color-secondary)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-black)]">Average Tree Age</p>
              <h2 className="text-2xl font-semibold">8yrs</h2>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 p-6 border
           overflow-x-auto  bg-[var(--color-white)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
              <h3 className="text-lg font-semibold">Variety & Planting Year Distribution</h3>
              <p className="text-sm text-[var(--color-black)]">Area measured in Kanals</p>
            </div>
            <div className="flex items-end h-96">
             {/* please put chart here umar */}
             <CustomBarChart data={pHData} dataKey="value" xKey="month" />
             

            </div>
             
            <div>
              
            </div>
          </div>

          <div className="p-6 flex flex-col gap-4 ">
            <h3 className="text-lg font-semibold">Yield Summary</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2  bg-[var(--color-white)]">
                <div>
                  <p className="text-xs text-[var(--color-black)]">Yield per Tree</p>
                  <h4 className="text-xl font-semibold">80 kg/tree</h4>
                </div>
              </div>

              <div className="p-4  border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2  bg-[var(--color-white)]">
                <div>
                  <p className="text-xs text-[var(--color-black)]">Total Trees (approx.)</p>
                  <h4 className="text-xl font-semibold">60</h4>
                </div>
                <div className="text-sm text-[var(--color-black)]">Sum of trees across orchards</div>
              </div>

              <div className="p-4  border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2  bg-[var(--color-white)]">
                <div>
                  <p className="text-xs text-[var(--color-black)]">Estimated Total Yield</p>
                  <h4 className="text-xl font-semibold">88kg</h4>
                  <p className="text-xs text-[var(--color-black)] mt-1">700kg/ha</p>
                </div>
                <div className="text-sm text-[var(--color-black)]">Calculated from yield/tree</div>
              </div>

              <div className="p-4  border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2  bg-[var(--color-white)]">
                <div>
                  <p className="text-xs text-[var(--color-black)]">Total Yield per Hectare (admin)</p>
                  <h4 className="text-xl font-semibold">90 kg/ha</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="p-4 sm:p-6 border mt-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-4  bg-[var(--color-white)]">
            <h3 className="text-lg font-semibold">Registered Orchards</h3>
            <p className="text-sm text-[var(--color-black)]">4 entries</p>
          </div>
          <table className="w-full text-sm table-auto min-w-[600px]">
            <thead>
              <tr className="text-[var(--color-black)] text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Area (Kanals)</th>
                <th className="py-2">Area (ha)</th>
                <th className="py-2">Variety</th>
                <th className="py-2">Planting Year</th>
                <th className="py-2">Density (trees/ha)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t font-semibold">
                <td className="py-3">Total</td>
                <td className="py-3">30</td>
                <td className="py-3">5000</td>
                <td className="py-3">7</td>
                <td className="py-3">4</td>
                <td className="py-3">6000</td>
              </tr>
              <tr className="border-t font-semibold">
                <td className="py-3">Total</td>
                <td className="py-3">30</td>
                <td className="py-3">5000</td>
                <td className="py-3">7</td>
                <td className="py-3">4</td>
                <td className="py-3">6000</td>
              </tr>
              <tr className="border-t font-semibold">
                <td className="py-3">Total</td>
                <td className="py-3">30</td>
                <td className="py-3">5000</td>
                <td className="py-3">7</td>
                <td className="py-3">4</td>
                <td className="py-3">6000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
