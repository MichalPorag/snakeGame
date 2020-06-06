import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faAnchor } from '@fortawesome/free-solid-svg-icons'
import './scss/app.scss';
import Game from "./components/Game/Game";

library.add(fab, faCheckSquare, faCoffee, faAnchor);

function App() {
  return (
      <Game NUMBER_OF_LINES={25} />
  );
}

export default App;
