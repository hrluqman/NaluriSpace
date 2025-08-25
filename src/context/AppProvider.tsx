import { PiProvider } from "./PiContext";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <PiProvider>{children}</PiProvider>;
};
