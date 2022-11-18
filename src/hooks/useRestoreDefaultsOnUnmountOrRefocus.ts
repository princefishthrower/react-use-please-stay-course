import { useEffect, useRef } from "react";
import { getFavicon } from "./../utils/getFavicon";

export const useRestoreDefaultsOnUnmountOrRefocus = (
  shouldIterateTitles: boolean,
  restoreDefaultsOnFocus: boolean
) => {
  const defaultTitle = useRef<string>();
  const defaultFavicon = useRef<HTMLLinkElement>(getFavicon());

  console.log(defaultFavicon.current.href);

  const restoreDefaults = () => {
    if (defaultTitle.current) {
      document.title = defaultTitle.current;
    }

    if (defaultFavicon.current) {
      document.head
        .querySelector('link[rel="icon"]')
        ?.setAttribute("href", defaultFavicon.current.href);
    }
  };

  // on mount, set defaults
  useEffect(() => {
    defaultTitle.current = document.title;
  }, []);

  // if should iterate switches to false and restoreDefaultsOnFocus is true, restore defaults
  // likewise, on unmount, restore the default title and favicon
  useEffect(() => {
    if (!shouldIterateTitles && restoreDefaultsOnFocus) {
      restoreDefaults();
    }
    return () => restoreDefaults();
  }, [shouldIterateTitles, restoreDefaultsOnFocus]);
};
