import { useMultipleInstancesCheck } from './useMultipleInstanceCheck';
import { validateParameters } from './../utils/validateParameters';
import { UsePleaseStayOptions } from './../types/UsePleaseStayOptions';
import { useState } from "react";
import { useFaviconChangeEffect } from "./useFaviconChangeEffect";
import { useListenToVisibilityChangeOnMount } from "./useListenToVisibilityChangeOnMount";
import { useTitleChangeEffect } from "./useTitleChangeEffect";
import { AnimationType } from '../enums/AnimationType';
import { useRestoreDefaultsOnUnmountOrRefocus } from './useRestoreDefaultsOnUnmountOrRefocus';

export const usePleaseStay = ({
  titles,
  animationType = AnimationType.LOOP,
  faviconLinks = [],
  interval = 500,
  shouldAlwaysPlay = false
}: UsePleaseStayOptions) => {
  validateParameters(titles, animationType);
  useMultipleInstancesCheck()
  const [shouldIterateTitles, setShouldIterateTitles] = useState(false);

  // Sets the shouldIterateTitles value whenever page visibility is lost.
  // Handles removing the event listener in cleanup as well.
  useListenToVisibilityChangeOnMount(setShouldIterateTitles, shouldAlwaysPlay);

  // Modifies the document.title of the page whenever shouldIterateTitles is true
  useTitleChangeEffect(titles, shouldIterateTitles, animationType, interval, shouldAlwaysPlay);

  // Modifies the favicon of the page whenever shouldIterateTitles is true
  useFaviconChangeEffect(faviconLinks, shouldIterateTitles, interval, shouldAlwaysPlay);
};
