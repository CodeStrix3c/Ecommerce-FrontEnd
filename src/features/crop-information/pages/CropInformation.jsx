import React from "react";
import {
  Search,
  CloudSun,
  Droplets,
  MapPin,
  FileDown,
  PhoneCall,
} from "lucide-react";
import PestAlert from "../components/PestAlert";
import Timeline from "../components/Timeline";
import ExpertAdvice from "../components/ExpertAdvice";

export default function CropInformation() {
  const Label = ({ children }) => (
    <div className="text-xs text-[var(--color-black)]">{children}</div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-white)] text-[var(--color-black)] lg:mt-36 md:mt-28">
      <header className="max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-semibold text-[var(--color-primary)]">
                Crop Information
              </h1>
              <p className="text-sm text-[var(--color-black)]">
                Real-time crop & region-specific recommendations
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <form className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-black)]" />
                <input
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-[var(--color-primary)] bg-[var(--color-white)] placeholder-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
                  placeholder="Search by crop or region (e.g. Wheat, Punjab)"
                />
              </div>
              <button
                type="button"
                className="px-3 py-2 rounded-md bg-[var(--color-primary)] text-[var(--color-white)] text-sm hover:bg-[var(--color-primary-hover)] transition"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-[var(--color-white)] rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 items-center">
            <img
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNyb3B8ZW58MHx8MHx8fDA%3D"
              alt="Wheat"
              className="w-full md:w-48 h-50 object-cover rounded-lg shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Wheat</h2>
                  <p className="text-sm text-[var(--color-black)] mt-1">
                    Cereal • Best season: Rabi (Nov - Apr)
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm text-[var(--color-black)] ">
                    Status
                  </div>
                  <div className="mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-black-hover)] text-[var(--color-primary)] text-sm">
                    Suitable to sow
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[var(--color-white)] border">
                  <Label>Avg Growth</Label>
                  <div className="font-medium">110 days</div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-white)] border">
                  <Label>Ideal Temp</Label>
                  <div className="font-medium">15 - 25°C</div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-white)] border">
                  <Label>Rainfall</Label>
                  <div className="font-medium">40 - 60 cm</div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-white)] border">
                  <Label>Sowing</Label>
                  <div className="font-medium">Oct 20 - Nov 20</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm font-medium">Quick Tips</div>
                <ul className="list-disc ml-5 text-sm mt-2 space-y-1 text-[var(--color-black)]">
                  <li>Ensure well-drained seedbed before sowing.</li>
                  <li>Apply phosphorus-rich fertilizer at planting.</li>
                  <li>Avoid waterlogging during germination stage.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[var-(--color-black)] rounded-2xl">
            <div className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-[var(--color-secondary)]" />
                Weather — Punjab
              </h3>
              <div className="mt-4 flex items-center gap-6">
                <div>
                  <div className="text-3xl font-semibold">22°C</div>
                  <div className="text-sm text-[var(--color-black)]">
                    Partly Cloudy
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--color-black)]">
                    Humidity: <span className="font-medium">64%</span>
                  </div>
                  <div className="text-sm text-[var(--color-black)] mt-1">
                    Rain (7d): <span className="font-medium">12 mm</span>
                  </div>
                  <div className="text-sm text-[var(--color-black)] mt-1">
                    Risk Level: <span className="font-medium">Low</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4 ">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Droplets className="h-5 w-5 text-[var(--color-secondary)]" />
                Soil & Irrigation
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <Label>pH</Label>
                  <div className="font-medium">6.8</div>
                </div>
                <div>
                  <Label>Moisture</Label>
                  <div className="font-medium">Optimal</div>
                </div>
                <div>
                  <Label>Organic Matter</Label>
                  <div className="font-medium">3.2%</div>
                </div>
                <div>
                  <Label>Irrigation</Label>
                  <div className="font-medium">5 - 6 irrigations</div>
                </div>
              </div>
            </div>
          </div>
          <PestAlert />
          <Timeline />
          <ExpertAdvice />
        </section>
        <aside className="space-y-4">
          <div className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[var(--color-secondary)]" />
              Region
            </h4>
            <select
              className="w-full border border-[var-(--color-black)] rounded-md px-3 py-2 text-sm text-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              defaultValue="Punjab"
            >
              <option value="Punjab">Punjab</option>
              <option value="Kashmir">Kashmir</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>
          <div className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4">
            <h4 className="font-semibold flex items-center gap-2">
              <FileDown className="h-5 w-5 text-[var(--color-secondary)]" />
              Quick Actions
            </h4>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <button className="w-full text-left px-3 py-2 rounded-md border hover:bg[var(--color-black-hover)] flex items-center gap-2">
                <Droplets className="h-4 w-4 text-[var(--color-secondary)]" />
                Run local soil test
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md border hover:bg[var(--color-black-hover)] flex items-center gap-2">
                <FileDown className="h-4 w-4 text-[var(--color-secondary)]" />
                Download crop calendar
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md border hover:bg[var(--color-black-hover)] flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-[var(--color-secondary)]" />
                Contact agronomist
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
