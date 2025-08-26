import { useContext } from "react";
import { PiContext, PiContextValue } from "../context/PiContext";

const FALLBACK: PiContextValue = {
  state: { pi: "0", status: "stopped", iteration: 0 },
  loading: false,
  error: null,
  refreshStatus: async () => {},
  start: async () => {},
  pause: async () => {},
  stop: async () => {},
  reset: async () => {},
};

export const usePi = () => {
  const ctx = useContext(PiContext);
  if (!ctx) {
    console.warn("usePi must be used inside PiProvider");
    return FALLBACK;
  }
  return ctx;
};
