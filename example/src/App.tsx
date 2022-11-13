import React from "react";
import { AnimationType, usePleaseStay } from "react-use-please-stay";

function App() {
  usePleaseStay({
    titles: ["Hello", "World!"],
    animationType: AnimationType.MARQUEE
  });
  return <></>;
}

export default App;
