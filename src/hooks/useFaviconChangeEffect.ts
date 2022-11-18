import { useEffect, useRef, useState } from "react";
import { getFavicon } from "../utils/getFavicon";
import { setFaviconHref } from "../utils/setFaviconHref";
import { useInterval } from "./useInterval";

export const useFaviconChangeEffect = (
  faviconLinks: string[],
  shouldIterateFavicons: boolean,
  interval: number,
  shouldAlwaysPlay: boolean
) => {
  const [faviconIndex, setFaviconIndex] = useState(0);
  const originalFaviconHref = useRef<string>();
  const faviconRef = useRef<HTMLLinkElement | null>();

  // at an interval of interval ms, increment the faviconIndex value
  // (if shouldIterateFavicons or shouldAlwaysPlay is true)
  useInterval(
    () => {
      if (faviconLinks.length > 1) {
        const nextIndex = faviconIndex + 1;
        nextIndex === faviconLinks.length
          ? setFaviconIndex(0)
          : setFaviconIndex(nextIndex);
      }
    },
    interval,
    shouldIterateFavicons || shouldAlwaysPlay
  );

  // when favicon index changes, and when shouldIterateFavicons is true set the favicon href to the given link
  useEffect(() => {
    if (shouldIterateFavicons) {
      faviconRef.current.href = faviconLinks[faviconIndex];
      return;
    }
    // if shouldIterateFavicons goes to false and should always play is false, AND originalfaviconhref is actually defined,
    // we should restore the original href
    if (
      !shouldIterateFavicons &&
      !shouldAlwaysPlay &&
      originalFaviconHref.current
    ) {
      setFaviconHref(originalFaviconHref.current);
    }
  }, [faviconIndex, shouldIterateFavicons]);

  // on mount, save the original href of the favicon
  useEffect(() => {
    faviconRef.current = getFavicon();
    originalFaviconHref.current = faviconRef.current.href;
    // on unmount, restore the original favicon (by setting whatever faviconRef is to the original favicon)
    return () => {
      if (originalFaviconHref.current) {
        faviconRef.current.href = originalFaviconHref.current;
      }
    };
  }, []);
};
