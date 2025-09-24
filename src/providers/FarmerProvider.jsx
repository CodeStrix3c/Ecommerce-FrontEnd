import { createContext, useContext, useState, useEffect } from "react";

const FarmerContext = createContext(null);

export function SupplierProvider({ children }) {
  const [supplier, setSupplier] = useState(null);

  const [sections, setSections] = useState({
    business: false,
    otp: false,
    licensing: false,
    productPortfolio: false,
    operationalDetails: false,
    financialPayment: false,
    supportServices: false,
  });

  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const totalSections = Object.keys(sections).length;
    const completedSections = Object.values(sections).filter(Boolean).length;

    setProgress(completedSections / totalSections);
    setIsComplete(completedSections === totalSections);
  }, [sections]);

  const setBusinessComplete = () =>
    setSections((prev) => ({ ...prev, business: true }));
  const setOtpComplete = () => setSections((prev) => ({ ...prev, otp: true }));
  const setLicensingComplete = () =>
    setSections((prev) => ({ ...prev, licensing: true }));
  const setProductPortfolioComplete = () =>
    setSections((prev) => ({ ...prev, productPortfolio: true }));
  const setOperationalDetailsComplete = () =>
    setSections((prev) => ({ ...prev, operationalDetails: true }));
  const setFinancialPaymentComplete = () =>
    setSections((prev) => ({ ...prev, financialPayment: true }));
  const setSupportServicesComplete = () =>
    setSections((prev) => ({ ...prev, supportServices: true }));

  return (
    <FarmerContext.Provider
      value={{
        supplier,
        setSupplier,
        sections,
        progress,
        isComplete,
        setBusinessComplete,
        setOtpComplete,
        setLicensingComplete,
        setProductPortfolioComplete,
        setOperationalDetailsComplete,
        setFinancialPaymentComplete,
        setSupportServicesComplete,
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
}

export const useSupplier = () => useContext(FarmerContext);
