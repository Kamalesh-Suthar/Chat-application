"use client";

import Spinner from "@/components/ui/spinner";
import { useContext, useState } from "react";
import { createContext } from "react";

type SpinnerContextType = {
  showSpinner: boolean;
  toggleSpinner: () => void;
};

const SpinnerContext = createContext<SpinnerContextType>({
  showSpinner: false,
  toggleSpinner: () => {},
});

interface SpinnerProviderProps {
  children: React.ReactNode;
}

export const SpinnerProvider = ({ children }: SpinnerProviderProps) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const toggleSpinner = () => {
    setShowSpinner((prev) => !prev);
  };

  return (
    <SpinnerContext.Provider value={{ showSpinner, toggleSpinner }}>
      {showSpinner ? <Spinner /> : children}
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => useContext(SpinnerContext);
