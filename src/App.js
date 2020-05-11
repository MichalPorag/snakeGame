import React from 'react';
import './scss/app.scss';

import Game from "./components/Game/Game";

function App() {
  return (
      <Game
          NUMBER_OF_LINES={25}
          cubeSize={25}
      />
  );
}

export default App;