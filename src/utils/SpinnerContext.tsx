import { createContext, useState, useContext, ReactNode } from "react";

interface SpinnerContextProps {
  isLoading: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
}

// 建立 SpinnerContext
const SpinnerContext = createContext<SpinnerContextProps | undefined>(
  undefined
);

interface SpinnerProviderProps {
  children: ReactNode;
}

// 建立 Provider
export const SpinnerProvider: React.FC<SpinnerProviderProps> = ({
  children,
}) => {
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
export const useSpinner = (): SpinnerContextProps => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error("useSpinner must be used within a SpinnerProvider");
  }
  return context;
};
