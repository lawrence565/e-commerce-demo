import { useState, ReactNode } from "react";
import { SpinnerContext } from "./spinnerContext";

interface SpinnerProviderProps {
  children: ReactNode;
}

// 建立 Provider
export const SpinnerProvider = ({ children }: SpinnerProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const showSpinner = () => {
    setIsLoading(true);
  };
  const hideSpinner = () => {
    setIsLoading(false);
  };
  return (
    <SpinnerContext.Provider value={{ isLoading, showSpinner, hideSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
};

// 自定義 hook 方便使用 SpinnerContext
