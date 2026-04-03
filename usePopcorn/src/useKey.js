import { useEffect } from "react";
export function useKey(key, callback) {
  useEffect(() => {
    function handle(event) {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [key, callback]);
}
