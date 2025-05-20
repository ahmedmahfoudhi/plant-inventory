import { useEffect, useState } from "react";
export default function useDebounce<T>(value: T, timeout: number) {
  const [currentValue, setCurrentValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setCurrentValue(value), timeout);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, timeout]);
  return currentValue;
}
