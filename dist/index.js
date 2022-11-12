import { useEffect, useRef, useState } from 'react';

var useListenToVisibilityChangeOnMount = function (setShouldToggleTitles) {
    // visibilitychange event handler
    var handleVisibilityChange = function () {
        setShouldToggleTitles(document.visibilityState !== "visible");
    };
    // on mount of this hook, add the event listener. on unmount, remove it
    useEffect(function () {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return function () {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);
};

var useInterval = function (callback, interval, shouldRun) {
    var callbackRef = useRef(callback);
    // Set callbackRef to the latest callback if callback changes
    useEffect(function () {
        callbackRef.current = callback;
    }, [callback]);
    // Set up the interval
    useEffect(function () {
        // Don't schedule if shouldRun is false.
        if (!shouldRun) {
            return;
        }
        var id = setInterval(function () { return callbackRef.current(); }, interval);
        return function () { return clearInterval(id); };
    }, [interval, shouldRun]);
};

var useTitleChangeEffect = function (titles, shouldIterateTitles) {
    var _a = useState(0), titleIndex = _a[0], setTitleIndex = _a[1];
    // at an interval of 500 ms, increment the titleIndex value
    // reset it to 0 if we've reached the end of the list
    useInterval(function () {
        var nextIndex = titleIndex + 1;
        nextIndex === titles.length ? setTitleIndex(0) : setTitleIndex(nextIndex);
    }, 500, shouldIterateTitles);
    // Each time titleIndex changes, we set the document.title to the value of titles at that index
    useEffect(function () {
        document.title = titles[titleIndex];
    }, [titleIndex]);
};

var usePleaseStay = function (titles) {
    var _a = useState(false), shouldIterateTitles = _a[0], setShouldIterateTitles = _a[1];
    // Sets the shouldToggleTitles value whenever page visibility is lost.
    // Handles removing the event listener in cleanup as well.
    useListenToVisibilityChangeOnMount(setShouldIterateTitles);
    // Modifies the document.title of the page whenever shouldToggle is true
    useTitleChangeEffect(titles, shouldIterateTitles);
};

export { usePleaseStay };
//# sourceMappingURL=index.js.map
