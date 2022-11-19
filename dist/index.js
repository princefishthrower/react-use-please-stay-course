import { useEffect, useRef, useState } from 'react';

// simple util that issues a console.error() in development mode, and is silent in all others
var issueWarningMessage = function (message) {
    if (process.env.NODE_ENV === "development") {
        console.warn("usePleaseStay: ".concat(message, " This message will be shown in development only."));
    }
};

var useMultipleInstancesCheck = function () {
    // on mount, check if we are not in production
    useEffect(function () {
        if (localStorage.getItem("usePleaseStay") !== null) {
            issueWarningMessage("usePleaseStay should be mounted only once in an application. Doing otherwise could lead to \uD83D\uDC7B strange \uD83D\uDC7B behavior. usePleaseStay was last mounted at ".concat(localStorage.getItem("usePleaseStay"), " Please check your code for multiple usePleaseStay usages. This warning is only valid if you see this warning appear more than once with different 'mounted at' dates in your console."));
        }
        // on mount, set the storage value to the curent ISO time
        localStorage.setItem("usePleaseStay", new Date().toISOString());
        // on unmount, remove the value from localStorage
        return function () { return localStorage.removeItem("usePleaseStay"); };
    }, []);
};

var AnimationType;
(function (AnimationType) {
    AnimationType["LOOP"] = "LOOP";
    AnimationType["CASCADE"] = "CASCADE";
    AnimationType["MARQUEE"] = "MARQUEE";
})(AnimationType || (AnimationType = {}));

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
    var nodeList = document.getElementsByTagName("link");
    for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i].getAttribute("rel") === "icon" ||
            nodeList[i].getAttribute("rel") === "shortcut icon") {
            console.log("found favicon!", nodeList[i]);
            return nodeList[i];
        }
    }
    return null;
};

var setFaviconHref = function (href) {
    var nodeList = document.getElementsByTagName("link");
    for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i].getAttribute("rel") === "icon" ||
            nodeList[i].getAttribute("rel") === "shortcut icon") {
            nodeList[i].href = href;
            return;
        }
    }
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

var useFaviconChangeEffect = function (faviconLinks, shouldIterateFavicons, interval, shouldAlwaysPlay) {
    var _a = useState(0), faviconIndex = _a[0], setFaviconIndex = _a[1];
    var originalFaviconHref = useRef();
    var faviconRef = useRef();
    // at an interval of interval ms, increment the faviconIndex value
    // (if shouldIterateFavicons or shouldAlwaysPlay is true)
    useInterval(function () {
        if (faviconLinks.length > 1) {
            var nextIndex = faviconIndex + 1;
            nextIndex === faviconLinks.length
                ? setFaviconIndex(0)
                : setFaviconIndex(nextIndex);
        }
    }, interval, shouldIterateFavicons || shouldAlwaysPlay);
    // when favicon index changes, and when shouldIterateFavicons is true set the favicon href to the given link
    useEffect(function () {
        if (shouldIterateFavicons) {
            faviconRef.current.href = faviconLinks[faviconIndex];
            return;
        }
        // if shouldIterateFavicons goes to false and should always play is false, AND originalfaviconhref is actually defined,
        // we should restore the original href
        if (!shouldIterateFavicons &&
            !shouldAlwaysPlay &&
            originalFaviconHref.current) {
            setFaviconHref(originalFaviconHref.current);
        }
    }, [faviconIndex, shouldIterateFavicons]);
    // on mount, save the original href of the favicon
    useEffect(function () {
        faviconRef.current = getFavicon();
        originalFaviconHref.current = faviconRef.current.href;
        // on unmount, restore the original favicon (by setting whatever faviconRef is to the original favicon)
        return function () {
            if (originalFaviconHref.current) {
                faviconRef.current.href = originalFaviconHref.current;
            }
        };
    }, []);
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

var useTitleChangeEffect = function (titles, shouldIterateTitles, animationType, interval, shouldAlwaysPlay) {
    var _a = useState(0), titleIndex = _a[0], setTitleIndex = _a[1];
    var originalTitleRef = useRef(document.title);
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
    // Each time titleIndex changes and shouldIterateTitles is true, we set the document.title to the value of titles at that index
    useEffect(function () {
        if (shouldIterateTitles || shouldAlwaysPlay) {
            switch (animationType) {
                case AnimationType.CASCADE:
                    return runCascadeTitleLogic();
                case AnimationType.MARQUEE:
                    return runMarqueeTitleLogic();
                case AnimationType.LOOP:
                default:
                    return runLoopTitleLogic();
            }
        }
        // if shouldIterateTitles and shouldAlwaysPlay are both false, we should restore the original title
        if (!shouldIterateTitles && !shouldAlwaysPlay) {
            document.title = originalTitleRef.current;
        }
    }, [titleIndex, shouldIterateTitles]);
    // on unmount, restore the original title
    useEffect(function () {
        return function () {
            document.title = originalTitleRef.current;
        };
    }, []);
};

var usePleaseStay = function (_a) {
    var titles = _a.titles, _b = _a.animationType, animationType = _b === void 0 ? AnimationType.LOOP : _b, _c = _a.faviconLinks, faviconLinks = _c === void 0 ? [] : _c, _d = _a.interval, interval = _d === void 0 ? 500 : _d, _e = _a.shouldAlwaysPlay, shouldAlwaysPlay = _e === void 0 ? false : _e;
    validateParameters(titles, animationType);
    useMultipleInstancesCheck();
    var _f = useState(false), shouldIterateTitles = _f[0], setShouldIterateTitles = _f[1];
    // Sets the shouldIterateTitles value whenever page visibility is lost.
    // Handles removing the event listener in cleanup as well.
    useListenToVisibilityChangeOnMount(setShouldIterateTitles, shouldAlwaysPlay);
    // Modifies the document.title of the page whenever shouldIterateTitles is true
    useTitleChangeEffect(titles, shouldIterateTitles, animationType, interval, shouldAlwaysPlay);
    // Modifies the favicon of the page whenever shouldIterateTitles is true
    useFaviconChangeEffect(faviconLinks, shouldIterateTitles, interval, shouldAlwaysPlay);
};

export { AnimationType, usePleaseStay };
//# sourceMappingURL=index.js.map
