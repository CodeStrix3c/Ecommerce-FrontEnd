import { createContext, useContext, useState, useEffect } from "react";

const FarmerContext = createContext(null);

export function FarmerProvider({ children }) {
  const [farmer, setFarmer] = useState(null);

  const [sections, setSections] = useState({
    profile: false,
    otp: false,
    profession: false,
    education: false,
    address: false,
  });

  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const totalSections = Object.keys(sections).length;
    const completedSections = Object.values(sections).filter(Boolean).length;

    setProgress(completedSections / totalSections);
    setIsComplete(completedSections === totalSections);
  }, [sections]);

  const setProfileComplete = () =>
    setSections((prev) => ({ ...prev, profile: true }));

  const setOtpComplete = () => setSections((prev) => ({ ...prev, otp: true }));

  const setEducationComplete = () =>
    setSections((prev) => ({ ...prev, education: true }));

  const setProfessionComplete = () =>
    setSections((prev) => ({ ...prev, profession: true }));

  const setAddressComplete = () =>
    setSections((prev) => ({ ...prev, address: true }));

  return (
    <FarmerContext.Provider
      value={{
        farmer,
        setFarmer,
        sections,
        progress,
        isComplete,
        setProfileComplete,
        setOtpComplete,
        setEducationComplete,
        setProfessionComplete,
        setAddressComplete,
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
}

export const useFarmer = () => useContext(FarmerContext);
