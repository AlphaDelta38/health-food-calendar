import { useEffect, useRef } from "react";


const useDebounce = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if(timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, []);

  return {
    debounce: (callback: () => void, delay: number = 500) => {

      if(timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback();
      }, delay);
    }
  }

}

export default useDebounce;