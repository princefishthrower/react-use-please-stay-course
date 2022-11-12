import React from "react";
import { AnimationType, usePleaseStay } from "react-use-please-stay";

function App() {
  usePleaseStay(["We ❤️ React!", "We ❤️ Newline!"], AnimationType.LOOP, [
    "https://reactjs.org/logo-180x180.png",
    "https://d8dgeb1f3fxgw.cloudfront.net/static/img/icons/apple-touch-icon.png",
  ]);
  return <></>;
}

export default App;
