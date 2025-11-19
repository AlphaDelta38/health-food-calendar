import { useEffect, useState } from "react";
import { PersistantLCKeys, PersistantLCMaps } from "@app-types/utils/persistant-statete";

function usePersistantState<T extends PersistantLCKeys>(
  key: T,
  defaultValue: PersistantLCMaps[T]
) {
  const [value, setValue] = useState<PersistantLCMaps[T]>(defaultValue);

  useEffect(() => {
    const data = localStorage.getItem(key);
    if (data) {
      setValue(JSON.parse(data));
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
  }, [key]);

  const setPersistant = (
    updater: PersistantLCMaps[T] | ((prev: PersistantLCMaps[T]) => PersistantLCMaps[T])
  ) => {
    setValue(prev => {
      if (typeof updater === "function") {
        const result = updater(prev as PersistantLCMaps[T]);
        localStorage.setItem(key, JSON.stringify(result));

        return result;
      } else {
        localStorage.setItem(key, JSON.stringify(updater));

        return updater;
      }
    });
  };

  return [value, setPersistant] as const;
}

export default usePersistantState;
