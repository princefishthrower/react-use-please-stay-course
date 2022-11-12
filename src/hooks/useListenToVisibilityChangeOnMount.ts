import { useEffect } from "react";

export const useListenToVisibilityChangeOnMount = (setShouldToggleTitles: (shouldToggleTitles: boolean) => void) => {
  // visibilitychange event handler
  const handleVisibilityChange = () => {
    setShouldToggleTitles(document.visibilityState !== "visible");
  };

  // on mount of this hook, add the event listener. on unmount, remove it
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}