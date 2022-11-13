import { useEffect } from "react";

export const useListenToVisibilityChangeOnMount = (
  setShouldToggleTitles: (shouldToggleTitles: boolean) => void,
  shouldAlwaysPlay: boolean
) => {
  // visibilitychange event handler
  const handleVisibilityChange = () => {
    setShouldToggleTitles(document.visibilityState !== "visible");
  };

  // on mount of this hook, add the event listener. on unmount, remove it
  useEffect(() => {
    if (shouldAlwaysPlay) {
      setShouldToggleTitles(true);
      return;
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shouldAlwaysPlay]);
};
