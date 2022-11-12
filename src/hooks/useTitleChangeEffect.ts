import { useEffect, useState } from "react";
import { useInterval } from "./useInterval";

export const useTitleChangeEffect = (titles: string[], shouldIterateTitles: boolean) => {
  const [titleIndex, setTitleIndex] = useState(0);

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

  // Each time titleIndex changes, we set the document.title to the value of titles at that index
  useEffect(() => {
    document.title = titles[titleIndex];
  }, [titleIndex]);
}