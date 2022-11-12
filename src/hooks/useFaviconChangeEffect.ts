import { useEffect, useRef, useState } from "react";
import { getFavicon } from "../utils/getFavicon";
import { useInterval } from "./useInterval";

export const useFaviconChangeEffect = (
  faviconLinks: string[],
  shouldIterateFavicons: boolean
) => {
  const [faviconIndex, setFaviconIndex] = useState(0);
  const faviconRef = useRef<HTMLLinkElement | null>(getFavicon());

  // at an interval of 500 ms, increment the faviconIndex value
  useInterval(
    () => {
      const nextIndex = faviconIndex + 1;
      nextIndex === faviconLinks.length
        ? setFaviconIndex(0)
        : setFaviconIndex(nextIndex);
    },
    500,
    shouldIterateFavicons
  );

  // when favicon index changes, set the favicon href to the given link
  useEffect(() => {
    faviconRef.current.href = faviconLinks[faviconIndex];
    faviconRef.current.setAttribute("style", "transform: rotate(180deg)");
  }, [faviconIndex]);
};
