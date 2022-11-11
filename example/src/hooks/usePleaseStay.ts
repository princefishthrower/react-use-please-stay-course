import { useEffect, useState } from "react";
import { useInterval } from "./useInterval";

export const usePleaseStay = (titles: string[]) => {
  const [shouldIterateTitles, setShouldIterateTitles] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  // visibilitychange event handler
  const handleVisibilityChange = () => {
    setShouldIterateTitles(document.visibilityState !== "visible");
  };

  // on mount of this hook, add the event listener. on unmount, remove it
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // at an interval of 500 ms, increment the titleIndex value
  // reset it to 0 if we've reached the end of the list
  useInterval(
    () => {
      const nextIndex = titleIndex + 1;
      nextIndex === titles.length ? setTitleIndex(0) : setTitleIndex(nextIndex);
    },
    500,
    shouldIterateTitles
  );

  // Each time titles or titleIndex changes, we set the document.title to the value of titles at that index
  useEffect(() => {
    document.title = titles[titleIndex];
  }, [titles, titleIndex]);
};
