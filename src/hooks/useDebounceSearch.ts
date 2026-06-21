import { useEffect, useState } from "react";

export function useDebouncedSearch(userInput: string, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      setDebouncedValue(userInput);
    }, delay);
    return () => clearTimeout(debounceFn);
  }, [userInput, delay]);

  return debouncedValue;
}
