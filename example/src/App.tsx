import React from 'react';
import { usePleaseStay } from './hooks/usePleaseStay';

function App() {
  usePleaseStay(["Title One!", "Title Two!", "Title Three?!?"]);
  return (
    <></>
  );
}

export default App;
