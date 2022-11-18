import React from "react";
import { AnimationType, usePleaseStay } from "react-use-please-stay";

function App() {
  usePleaseStay({
    titles: ["Newline", "Redux"],
    animationType: AnimationType.LOOP,
    faviconLinks: ["https://d8dgeb1f3fxgw.cloudfront.net/static/img/icons/apple-touch-icon.png", "https://redux.js.org/img/favicon/favicon.ico"],
    shouldAlwaysPlay: true,
  });
  return <></>;
}

export default App;
