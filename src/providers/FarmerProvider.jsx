// context/FarmerContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  ALL_PROFILE_FIELDS,
  getFilledFieldsCount,
} from "@/constants/profileFields";

const FarmerContext = createContext(null);

export function FarmerProvider({ children }) {
  const [farmer, setFarmer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!farmer) {
      setProgress(0);
      setIsComplete(false);
      return;
    }

    const filled = getFilledFieldsCount(farmer);
    const total = ALL_PROFILE_FIELDS.length;
    setProgress(filled / total);
    setIsComplete(filled === total);
  }, [farmer]);

  return (
    <FarmerContext.Provider value={{ farmer, setFarmer, progress, isComplete }}>
      {children}
    </FarmerContext.Provider>
  );
}

export const useFarmer = () => useContext(FarmerContext);
