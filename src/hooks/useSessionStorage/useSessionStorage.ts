import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

const useSessionStorage = <T>(
  key: string,
  initialValue: T | null = null
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = window.sessionStorage.getItem(key);
    if (storedValue) return JSON.parse(storedValue);
    if (
      initialValue !== null &&
      (typeof initialValue === "object" || Array.isArray(initialValue))
    ) {
      return initialValue;
    }
    return JSON.parse(JSON.stringify(initialValue));
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;
