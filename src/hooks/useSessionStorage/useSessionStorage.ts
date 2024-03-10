import { useState, useEffect } from "react";

const useSessionStorage = (key: string, initialValue: unknown = null) => {
  const [value, setValue] = useState<unknown>(() => {
    const storedValue = sessionStorage.getItem(key);
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
