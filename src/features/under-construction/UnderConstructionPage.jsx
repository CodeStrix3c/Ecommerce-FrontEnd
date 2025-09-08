import { Clock, Construction } from "lucide-react";

const UnderConstruction = () => {
  return (
    <div
      className="flex items-center justify-center h-screen text-center relative">
      
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--color-overlay)" }}
      ></div>

     
      <div className="relative z-10 text-[var(--color-white)] px-6">
        <div className="flex items-center justify-center mb-6">
          <Clock className="w-16 h-16 text-[var(--color-secondary)]" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[var(--colo whiter-primary)]">
          This Page is Under Construction
        </h1>
        
        <h3 className="mt-4 text-2xl max-w-2xl mx-auto text-[var(--color-white-hover)]">
          Stay tuned
        </h3>
      </div>
    </div>
  );
};

export default UnderConstruction;
