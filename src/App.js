import React, {useState, useEffect} from 'react';
import './scss/app.scss';

function App() {
  const [cubesNumber, setCubesNumber] = useState(10);
  const [snakePositions, setsnakePositions] = useState([23,24,25,26]);

  useEffect(() => {
    const interval = setInterval(() => {setsnakePositions.push()})
  });

  let cubes = () => {
    return [...Array(cubesNumber ** 2).keys()].map(i => <div className={snakePositions.includes(i) ? "cube middle" : "cube"} key={i}/>);
  };

  return (
    <main>
      {cubes()}
    </main>
  );
}

export default App;