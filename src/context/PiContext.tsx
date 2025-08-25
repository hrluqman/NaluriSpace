import { createContext, useContext, useState, useCallback } from "react";
import * as api from "../services/api";

type PiState = {
  pi: string;
  status: "running" | "paused" | "stopped";
  iteration: number;
};

type PiContextValue = {
  state: PiState;
  loading: boolean;
  error?: string | null;
  refreshStatus: () => Promise<void>;
  start: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  reset: () => Promise<void>;
};

type controlActionValue = "start" | "pause" | "stop" | "reset";

const defaultState: PiState = { pi: "0", status: "stopped", iteration: 0 };

export const PiContext = createContext<PiContextValue | undefined>(undefined);

export function PiProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PiState>(defaultState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshStatus = useCallback(async () => {
    try {
      const data = await api.getStatus();
      setState(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch");
    }
  }, []);

  const callControl = useCallback(async (action: controlActionValue) => {
    setLoading(true);
    try {
      const data = await api.setControl(action);
      setState(data);
    } catch (err: any) {
      setError(err.message || "Control failed");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PiContext.Provider
      value={{
        state,
        loading,
        error,
        refreshStatus,
        start: () => callControl("start"),
        pause: () => callControl("pause"),
        stop: () => callControl("stop"),
        reset: () => callControl("reset"),
      }}
    >
      {children}
    </PiContext.Provider>
  );
}
