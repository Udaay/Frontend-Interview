import { useState, useEffect, useRef } from "react";

const useLocalStorage = (
  key,
  defaultValue,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const previousKey = prevKeyRef.current;
    if (previousKey !== key) {
      localStorage.removeItem(prevKeyRef);
    }
    prevKeyRef.current = key;
    localStorage.setItem(key, serialize(state));
  }, [state, key, serialize]);

  return [state, setState];
};

export default useLocalStorage;
