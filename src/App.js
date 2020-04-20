import React, {useState, useEffect} from 'react';
import './scss/app.scss';

function App() {
  const cubesNumber = 25;
  const [snakeDirection, setSnakeDirection] = useState("left");
  const [snakePositions, setSnakePositions] = useState([453,454,455,456]);
  const [failedScreenVisibility, setFailedScreenVisibility] = useState("hide");
  const [applePositions, setApplePositions] = useState(456);

  useEffect(() => {
    const interval = setInterval(() => {
      let currentSP = snakePositions;
      switch (snakeDirection) {
        case "left":
          handleMovingLeft(currentSP);
          break;
        case "right":
          handleMovingRight(currentSP);
          break;
        case "down":
          handleMovingDown(currentSP);
          break;
        case "up":
          handleMovingUp(currentSP);
          break;
      }
    }, 100);

    return () => clearInterval(interval);
  });

  function handleMovingRight(currentSP) {
    let nextNum = currentSP[currentSP.length - 1] + 1;
    let num = nextNum % cubesNumber;

    if (num === (cubesNumber - 1)) {
      setFailedScreenVisibility("show")
    } else {
      currentSP.shift();
      currentSP.push(nextNum);
    }
    setSnakePositions([...currentSP]);
  }

  function handleMovingLeft(currentSP) {
    let nextNum = currentSP[currentSP.length - 1] - 1;
    let num = nextNum % cubesNumber;

    if (num === 0) {
      setFailedScreenVisibility("show")
    } else {
      currentSP.shift();
      currentSP.push(nextNum);
    }
    setSnakePositions([...currentSP]);
  }

  function handleMovingDown(currentSP) {
    let nextNum = currentSP[currentSP.length - 1] + cubesNumber;

    if (Math.floor(nextNum / cubesNumber) === (cubesNumber - 1)) {
      setFailedScreenVisibility("show")
    } else {
      currentSP.shift();
      currentSP.push(nextNum);
    }
    setSnakePositions([...currentSP]);
  }

  function handleMovingUp(currentSP) {
    let nextNum = currentSP[currentSP.length - 1] - cubesNumber;

    if (nextNum < 1) {
      setFailedScreenVisibility("show")
    } else {
      currentSP.shift();
      currentSP.push(nextNum);
    }
    setSnakePositions([...currentSP]);
  }

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        if (snakeDirection !== "right") {
          setSnakeDirection("left");
        }
        break;
      case "ArrowRight":
        if (snakeDirection !== "left") {
          setSnakeDirection( "right");
        }
        break;
      case "ArrowDown":
        if (snakeDirection !== "up") {
          setSnakeDirection("down");
        }
        break;
      case "ArrowUp":
        if (snakeDirection !== "down") {
          setSnakeDirection("up")
        }
        break;
      case "Enter":
        if (failedScreenVisibility === "show") {
          startNewGame();
        }
        break;
    }
  };

  const startNewGame = () => {
    setSnakePositions([453,454,455,456]);
    setFailedScreenVisibility("hide")
  };

  document.addEventListener('keydown', handleKeyPress);

  let cubes = () => {
    return [...Array(cubesNumber).keys()].map(i => (i === 0 || i === (cubesNumber - 1)) ?
        <div className={"frame-top-bottom"}
             key={i}/> :
        <div className={"row"} key={i}>
          {[...Array(cubesNumber).keys()].map(j =>
              (j === 0 || j === (cubesNumber - 1)) ?
              <div className={"frame-sides"}
                   key={i * cubesNumber + j}/> :
              <div className={snakePositions.includes(i * cubesNumber + j) ? "cube middle" : "cube"}
                   key={i * cubesNumber + j}/>
          )}
        </div>
    );
  };

  if (snakePositions[snakePositions.length - 1] === applePositions) {
    switch (snakeDirection) {
      case "right":
        setSnakePositions([...snakePositions, snakePositions[snakePositions.length - 1] + 1]);
        break;
      case "left":
        setSnakePositions([...snakePositions, snakePositions[snakePositions.length - 1] - 1]);
        break;
      case "up":
        setSnakePositions([...snakePositions, snakePositions[snakePositions.length - 1] - 10]);
        break;
      case "down":
        setSnakePositions([...snakePositions, snakePositions[snakePositions.length - 1] + 10]);
        break;
    }
  }

  return (
    <React.Fragment>
      <main>
        {cubes()}
      </main>
      <div id={"failed-screen"}
           className={failedScreenVisibility}>
        <section>
          <h2>Hoo...</h2>
          <h1>You Failed!</h1>
        </section>
        <h3>Wont to start over?</h3>
        <button onClick={startNewGame}>
          Start Again
        </button>
      </div>
    </React.Fragment>
  );
}

export default App;