import { useEffect, useState } from "react";
import { AnimationType } from "../enums/AnimationType";
import { useInterval } from "./useInterval";

export const useTitleChangeEffect = (
  titles: string[],
  shouldIterateTitles: boolean,
  animationType: AnimationType
) => {
  const [titleIndex, setTitleIndex] = useState(0);

  const runLoopIterationLogic = () => {
    const nextIndex = titleIndex + 1;
    nextIndex === titles.length ? setTitleIndex(0) : setTitleIndex(nextIndex);
  };

  const runCascadeIterationLogic = () => {
    const nextIndex = titleIndex + 1;
    nextIndex === titles[0].length
      ? setTitleIndex(0)
      : setTitleIndex(nextIndex);
  };

  const runLoopTitleLogic = () => {
    document.title = titles[titleIndex];
  };

  const runCascadeTitleLogic = () => {
    document.title = titles[0].substring(0, titleIndex);
  };

  // at an interval of 500 ms, increment the titleIndex value
  // reset it to 0 if we've reached the end of the list
  useInterval(
    () => {
      switch (animationType) {
        case AnimationType.CASCADE:
          return runCascadeIterationLogic();
        case AnimationType.LOOP:
        default:
          return runLoopIterationLogic();
      }
    },
    500,
    shouldIterateTitles
  );

  // Each time titleIndex changes, we set the document.title to the value of titles at that index
  useEffect(() => {
    switch (animationType) {
      case AnimationType.CASCADE:
        return runCascadeTitleLogic();
      case AnimationType.LOOP:
      default:
        return runLoopTitleLogic();
    }
  }, [titleIndex]);
};
