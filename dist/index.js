import { useRef, useEffect, useState } from 'react';

var AnimationType;
(function (AnimationType) {
    AnimationType["LOOP"] = "LOOP";
    AnimationType["CASCADE"] = "CASCADE";
    AnimationType["MARQUEE"] = "MARQUEE";
})(AnimationType || (AnimationType = {}));

// simple util that issues a console.error() in development mode, and is silent in all others
var issueWarningMessage = function (message) {
    if (process.env.NODE_ENV === "development") {
        console.warn("usePleaseStay: ".concat(message, " This message will be shown in development only."));
    }
};

var validateParameters = function (titles, animationType) {
    if (titles.length === 1 && titles[0] === "") {
        issueWarningMessage("You have passed an empty string as the title. This will result in no text being displayed, regardless of AnimationType chosen.");
    }
    if (titles.length > 1 && animationType === AnimationType.CASCADE) {
        issueWarningMessage('You have passed more than one title, but have specified "AnimationType.CASCADE". Only the first title in the titles array will be used.');
    }
    if (titles.length > 1 && animationType === AnimationType.MARQUEE) {
        issueWarningMessage('You have passed more than one title, but have specified "AnimationType.MARQUEE". Only the first title in the titles array will be used.');
    }
};

var getFavicon = function () {
    var nodeList = document.getElementsByTagName('link');
    for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i].getAttribute('rel') === 'icon' ||
            nodeList[i].getAttribute('rel') === 'shortcut icon') {
            return nodeList[i];
        }
    }
    return null;
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

var useFaviconChangeEffect = function (faviconLinks, shouldIterateFavicons, interval) {
    var _a = useState(0), faviconIndex = _a[0], setFaviconIndex = _a[1];
    var faviconRef = useRef(getFavicon());
    // at an interval of interval ms, increment the faviconIndex value
    useInterval(function () {
        if (faviconLinks.length > 1) {
            var nextIndex = faviconIndex + 1;
            nextIndex === faviconLinks.length
                ? setFaviconIndex(0)
                : setFaviconIndex(nextIndex);
        }
    }, interval, shouldIterateFavicons);
    // when favicon index changes, set the favicon href to the given link
    useEffect(function () {
        faviconRef.current.href = faviconLinks[faviconIndex];
        faviconRef.current.setAttribute("style", "transform: rotate(180deg)");
    }, [faviconIndex]);
};

var useListenToVisibilityChangeOnMount = function (setShouldToggleTitles, shouldAlwaysPlay) {
    // visibilitychange event handler
    var handleVisibilityChange = function () {
        setShouldToggleTitles(document.visibilityState !== "visible");
    };
    // on mount of this hook, add the event listener. on unmount, remove it
    useEffect(function () {
        if (shouldAlwaysPlay) {
            setShouldToggleTitles(true);
            return;
        }
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return function () {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [shouldAlwaysPlay]);
};

var CHROME_TAB_CHARACTER_COUNT = 30;

var useTitleChangeEffect = function (titles, shouldIterateTitles, animationType, interval) {
    var _a = useState(0), titleIndex = _a[0], setTitleIndex = _a[1];
    var runLoopIterationLogic = function () {
        var nextIndex = titleIndex + 1;
        nextIndex === titles.length ? setTitleIndex(0) : setTitleIndex(nextIndex);
    };
    var runCascadeIterationLogic = function () {
        var nextIndex = titleIndex + 1;
        nextIndex === titles[0].length
            ? setTitleIndex(0)
            : setTitleIndex(nextIndex);
    };
    var runMarqueeIterationLogic = function () {
        var nextIndex = titleIndex + 1;
        nextIndex === CHROME_TAB_CHARACTER_COUNT
            ? setTitleIndex(0)
            : setTitleIndex(nextIndex);
    };
    var runLoopTitleLogic = function () {
        document.title = titles[titleIndex];
    };
    var runCascadeTitleLogic = function () {
        document.title = titles[0].substring(0, titleIndex);
    };
    var runMarqueeTitleLogic = function () {
        var carryOverCount = titleIndex + titles[0].length - CHROME_TAB_CHARACTER_COUNT;
        if (carryOverCount > 0) {
            var spaceText = "\u205f​​​".repeat(CHROME_TAB_CHARACTER_COUNT - titles[0].length);
            document.title =
                titles[0].substring(titles[0].length - carryOverCount, titles[0].length) +
                    spaceText +
                    titles[0].substring(0, titles[0].length - carryOverCount);
        }
        else {
            var offset = "\u205f​​​".repeat(titleIndex);
            document.title = offset + titles[0];
        }
    };
    // at an interval of interval ms, increment the titleIndex value
    // reset it to 0 if we've reached the end of the list
    useInterval(function () {
        switch (animationType) {
            case AnimationType.CASCADE:
                return runCascadeIterationLogic();
            case AnimationType.MARQUEE:
                return runMarqueeIterationLogic();
            case AnimationType.LOOP:
            default:
                return runLoopIterationLogic();
        }
    }, interval, shouldIterateTitles);
    // Each time titleIndex changes, we set the document.title to the value of titles at that index
    useEffect(function () {
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

var usePleaseStay = function (_a) {
    var titles = _a.titles, _b = _a.animationType, animationType = _b === void 0 ? AnimationType.LOOP : _b, _c = _a.faviconLinks, faviconLinks = _c === void 0 ? [] : _c, _d = _a.interval, interval = _d === void 0 ? 500 : _d, _e = _a.shouldAlwaysPlay, shouldAlwaysPlay = _e === void 0 ? false : _e;
    validateParameters(titles, animationType);
    var _f = useState(false), shouldIterateTitles = _f[0], setShouldIterateTitles = _f[1];
    // Sets the shouldToggleTitles value whenever page visibility is lost.
    // Handles removing the event listener in cleanup as well.
    useListenToVisibilityChangeOnMount(setShouldIterateTitles, shouldAlwaysPlay);
    // Modifies the document.title of the page whenever shouldToggle is true
    useTitleChangeEffect(titles, shouldIterateTitles, animationType, interval);
    // Modifies the favicon of the page whenever shouldToggle is true
    useFaviconChangeEffect(faviconLinks, shouldIterateTitles, interval);
};

export { AnimationType, usePleaseStay };
//# sourceMappingURL=index.js.map
