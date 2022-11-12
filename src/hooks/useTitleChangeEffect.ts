import { useEffect, useState } from "react";
import { CHROME_TAB_CHARACTER_COUNT } from "../constants/Constants";
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

  const runMarqueeIterationLogic = () => {
    const nextIndex = titleIndex + 1;
    nextIndex === CHROME_TAB_CHARACTER_COUNT
      ? setTitleIndex(0)
      : setTitleIndex(nextIndex);
  };

  const runLoopTitleLogic = () => {
    document.title = titles[titleIndex];
  };

  const runCascadeTitleLogic = () => {
    document.title = titles[0].substring(0, titleIndex);
  };

  const runMarqueeTitleLogic = () => {
    const carryOverCount =
      titleIndex + titles[0].length - CHROME_TAB_CHARACTER_COUNT;
  
    if (carryOverCount > 0) {
      const spaceText = "\u205f​​​".repeat(
        CHROME_TAB_CHARACTER_COUNT - titles[0].length
      );
      document.title =
        titles[0].substring(titles[0].length - carryOverCount, titles[0].length) +
        spaceText +
        titles[0].substring(0, titles[0].length - carryOverCount);
    } else {
      const offset = "\u205f​​​".repeat(titleIndex);
      document.title = offset + titles[0];
    }
  };

  // at an interval of 500 ms, increment the titleIndex value
  // reset it to 0 if we've reached the end of the list
  useInterval(
    () => {
      switch (animationType) {
        case AnimationType.CASCADE:
          return runCascadeIterationLogic();
        case AnimationType.MARQUEE:
          return runMarqueeIterationLogic();
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
      case AnimationType.MARQUEE:
        return runMarqueeTitleLogic();
      case AnimationType.LOOP:
      default:
        return runLoopTitleLogic();
    }
  }, [titleIndex]);
};
