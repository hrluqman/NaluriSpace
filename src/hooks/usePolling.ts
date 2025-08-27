import { useEffect } from 'react';

/**
 * Repeatedly calls a callback every `intervalMs`.
 * Cleans up automatically when the component unmounts.
 */
export function usePolling(callback: () => void | Promise<void>, intervalMs = 1000) {
    
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, intervalMs);

    return () => clearInterval(id);
  }, [callback, intervalMs]);
}
