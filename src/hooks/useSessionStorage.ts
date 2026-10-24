import { useCallback, useState, type Dispatch, type SetStateAction } from 'react';

const getInitialValue = <T,>(key: string, initialValue: T): T => {
  if (typeof window === 'undefined') return initialValue;

  try {
    const stored = window.sessionStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  } catch {
    return initialValue;
  }
};

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => getInitialValue(key, initialValue));

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      setStoredValue((previous) => {
        const nextValue =
          typeof value === 'function'
            ? (value as (previousValue: T) => T)(previous)
            : value;

        try {
          window.sessionStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // Storage can be unavailable in privacy modes. The in-memory state still works.
        }

        return nextValue;
      });
    },
    [key],
  );

  const clearValue = useCallback(() => {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      // Keep the UI functional even when storage is unavailable.
    }
    setStoredValue(initialValue);
  }, [initialValue, key]);

  return [storedValue, setValue, clearValue] as const;
}
