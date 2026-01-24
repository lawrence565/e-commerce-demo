import { createContext } from "react";

export interface SpinnerContextProps {
  isLoading: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
}

export const SpinnerContext = createContext<SpinnerContextProps | undefined>(
  undefined
);
