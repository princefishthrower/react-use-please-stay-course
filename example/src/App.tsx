import React, { useState } from "react";
import {
  usePleaseStay,
  AnimationType,
} from "@fullstackcraftllc/react-use-please-stay";
import { ArrayOfOneOrMore } from "../../dist/types/ArrayOfOneOrMore";
import { CodeHighlighter } from "./components/CodeHighlighter";

export default function App() {
  const [titles, setTitles] = useState<ArrayOfOneOrMore<string>>([
    "Newline!",
    "TypeScript!",
  ]);
  const [interval, setInterval] = useState<number>(1000);
  const [animationType, setAnimationType] = useState<AnimationType>(
    AnimationType.LOOP
  );
  const [faviconLinks, setFaviconLinks] = useState<Array<string>>([
    "https://d8dgeb1f3fxgw.cloudfront.net/static/img/icons/apple-touch-icon.png",
    "https://www.typescriptlang.org/favicon-32x32.png",
  ]);
  const [shouldAlwaysPlay, setShouldAlwaysPlay] = useState<boolean>(true);

  const code = `usePleaseStay({
    titles: [
      ${titles.map((title) => `"${title}"`).join(",\n      ")}
    ],
    interval: ${interval},
    animationType: Animation.${animationType},
    faviconLinks: [
      ${faviconLinks.map((faviconLink) => `"${faviconLink}"`).join(",\n      ")}
    ],
    shouldAlwaysPlay: ${shouldAlwaysPlay.toString()}
})`;

  usePleaseStay({
    titles,
    interval,
    animationType,
    faviconLinks,
    shouldAlwaysPlay,
  });

  return (
    <div className="container">
      <h1>
        <pre className="m-0 mt-4">react-use-please-stay</pre>
      </h1>
      <h2>
        A React hook that animates the document title and/or favicon when focus
        from the page is lost.
      </h2>
      <p>Install with:</p>
      <CodeHighlighter code={"npm install --save react-use-please-stay"} />
      <p className="mt-3">
        Copy and paste this code right into your component:
      </p>
      <CodeHighlighter code={code} />
      <div className="form-group">
        <label htmlFor="title">
          <pre className="m-0 mt-4">titles</pre>
        </label>
        <br />
        <small id="titleHelp" className="form-text text-muted">
          You can comma separate multiple titles
        </small>
        <div className="form-group">
          <textarea
            className="form-control"
            value={titles}
            onChange={(event) => {
              const titles = event.target.value.split(",");
              setTitles(
                titles.length > 0
                  ? [titles[0], ...titles.slice(1, titles.length)]
                  : [""]
              );
            }}
          ></textarea>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="interval">
          <pre className="m-0 mt-4">interval</pre>
        </label>
        <input
          type="number"
          className="form-control"
          id="interval"
          placeholder="Enter interval"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="animationType">
          <pre className="m-0 mt-4">animationType</pre>
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="animationType"
            id="animationType1"
            value={AnimationType.LOOP}
            checked={animationType === AnimationType.LOOP}
            onChange={(e) => setAnimationType(e.target.value as AnimationType)}
          />
          <label className="form-check-label" htmlFor="animationType1">
            <pre className="m-0">AnimationType.LOOP</pre>
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="animationType"
            id="animationType2"
            value={AnimationType.CASCADE}
            checked={animationType === AnimationType.CASCADE}
            onChange={(e) => setAnimationType(e.target.value as AnimationType)}
          />
          <label className="form-check-label" htmlFor="animationType2">
            <pre className="m-0">AnimationType.CASCADE</pre>
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="animationType"
            id="animationType2"
            value={AnimationType.MARQUEE}
            checked={animationType === AnimationType.MARQUEE}
            onChange={(e) => setAnimationType(e.target.value as AnimationType)}
          />
          <label className="form-check-label" htmlFor="animationType2">
            <pre className="m-0">AnimationType.MARQUEE</pre>
          </label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="faviconUrl">
          <pre className="m-0 mt-4">faviconLinks</pre>
        </label>
        <small id="faviconUrlHelp" className="form-text text-muted">
          <br />
          You can comma separate multiple favicon links
        </small>
        <textarea
          id="faviconURIs"
          className="form-control"
          value={faviconLinks}
          onChange={(event) => setFaviconLinks(event.target.value.split(","))}
        ></textarea>
        <p>Try some of these:</p>
        <p>
          Newline Favicon:
          https://d8dgeb1f3fxgw.cloudfront.net/static/img/icons/apple-touch-icon.png
        </p>
        <p>
          TypeScript Favicon: https://www.typescriptlang.org/favicon-32x32.png
        </p>
        <p>Redux Favicon: https://redux.js.org/img/favicon/favicon.ico</p>
        <p>Gatsby Favicon: https://www.gatsbyjs.com/favicon-32x32.png</p>
        <p>
          Electron Favicon:
          https://www.electronjs.org/images/favicon.b7a59262df48d6563400baf5671da548.ico
        </p>
      </div>
      <pre className="m-0 mt-4">shouldAlwaysPlay</pre>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="shouldAlwaysPlay"
          checked={shouldAlwaysPlay}
          onChange={(e) => setShouldAlwaysPlay(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="shouldAlwaysPlay">
          <pre>{shouldAlwaysPlay.toString()}</pre>
        </label>
      </div>
    </div>
  );
}
