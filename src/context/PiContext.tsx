import { createContext, useState, useCallback, useEffect } from "react";
import * as api from "../services/api";
import { getItemJSON, setItemJSON, STORAGE_KEYS } from "../services/storage";
import { Alert, Platform, ToastAndroid } from "react-native";

type PiState = {
  pi: string;
  status: "running" | "paused" | "stopped";
  iteration: number;
};

export type PiContextValue = {
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

const DEFAULT_STATE: PiState = { pi: "0", status: "stopped", iteration: 0 };

export const PiContext = createContext<PiContextValue | undefined>(undefined);

function showErrorToast(message = "Error — action not available") {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("Error", message);
  }
}

export function PiProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PiState>(DEFAULT_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const cached = await getItemJSON<PiState>(STORAGE_KEYS.LAST_STATE);
        if (cached) setState(cached);
      } catch (err) {
        console.warn("PiProvider failed to load cached state", err);
      }

      // Fire an initial refresh
      try {
        await refreshStatus();
      } catch (_) {
        /* silent */
      }
    })();
  }, []);

  const refreshStatus = useCallback(async () => {
    try {
      const data = await api.getStatus();
      if (data && typeof data === "object") {
        setState(data);
        setError(null);
        // persist last successful state
        await setItemJSON(STORAGE_KEYS.LAST_STATE, data);
      }
    } catch (err: any) {
      setError(err?.message ?? "Failed to fetch status");
      // keep previous / cached state visible
    }
  }, []);

  const callControl = useCallback(async (action: controlActionValue) => {
    setLoading(true);
    try {
      const data = await api.setControl(action);
      if (data && typeof data === "object") {
        setState(data);
        setError(null);
        await setItemJSON(STORAGE_KEYS.LAST_STATE, data);
      }
    } catch (err: any) {
      setError(err?.message ?? "Control action failed");
      showErrorToast("Action cannot be performed at the moment.");
      // do not overwrite last known state
    } finally {
      setLoading(false);
    }
  }, []);

  const start = () => callControl("start");
  const pause = () => callControl("pause");
  const stop = () => callControl("stop");
  const reset = () => callControl("reset");

  return (
    <PiContext.Provider
      value={{
        state,
        loading,
        error,
        refreshStatus,
        start,
        pause,
        stop,
        reset,
      }}
    >
      {children}
    </PiContext.Provider>
  );
}
