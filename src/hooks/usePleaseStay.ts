import { useState } from "react";
import { useListenToVisibilityChangeOnMount } from "./useListenToVisibilityChangeOnMount";
import { useTitleChangeEffect } from "./useTitleChangeEffect";

export const usePleaseStay = (titles: string[]) => {
  const [shouldIterateTitles, setShouldIterateTitles] = useState(false);

  // Sets the shouldToggleTitles value whenever page visibility is lost.
  // Handles removing the event listener in cleanup as well.
  useListenToVisibilityChangeOnMount(setShouldIterateTitles);

  // Modifies the document.title of the page whenever shouldToggle is true
  useTitleChangeEffect(titles, shouldIterateTitles)
};
