import { useState } from "react";
import { AnimationType } from "../enums/AnimationType";
import { useFaviconChangeEffect } from "./useFaviconChangeEffect";
import { useListenToVisibilityChangeOnMount } from "./useListenToVisibilityChangeOnMount";
import { useTitleChangeEffect } from "./useTitleChangeEffect";

export const usePleaseStay = (titles: string[], animationType: AnimationType, faviconLinks: string[], interval: number) => {
  const [shouldIterateTitles, setShouldIterateTitles] = useState(false);

  // Sets the shouldToggleTitles value whenever page visibility is lost.
  // Handles removing the event listener in cleanup as well.
  useListenToVisibilityChangeOnMount(setShouldIterateTitles);

  // Modifies the document.title of the page whenever shouldToggle is true
  useTitleChangeEffect(titles, shouldIterateTitles, animationType, interval);

  // Modifies the favicon of the page whenever shouldToggle is true
  useFaviconChangeEffect(faviconLinks, shouldIterateTitles, interval)
};
