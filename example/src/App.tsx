import React from 'react';
import { AnimationType, usePleaseStay } from 'react-use-please-stay';

function App() {
  usePleaseStay(["I am a cascading title!"], AnimationType.CASCADE);
  return (
    <></>
  );
}

export default App;
