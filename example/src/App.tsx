import React from 'react';
import { AnimationType, usePleaseStay } from 'react-use-please-stay';

function App() {
  usePleaseStay(["I am a marquee!"], AnimationType.MARQUEE);
  return (
    <></>
  );
}

export default App;
