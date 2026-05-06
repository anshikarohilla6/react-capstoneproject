import { useEffect, useState } from 'react';

export function useDebouncedValue(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(function updateDebouncedValue() {
    const timerId = window.setTimeout(function commitValue() {
      setDebouncedValue(value);
    }, delay);

    return function cleanupTimer() {
      window.clearTimeout(timerId);
    };
  }, [delay, value]);

  return debouncedValue;
}