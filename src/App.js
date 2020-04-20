import React, {useState, useEffect} from 'react';
import './scss/app.scss';

function App() {
  const cubesNumber = 10;
  const [snakeDirection, setSnakeDirection] = useState("left");
  const [snakePositions, setSnakePositions] = useState([23,24,25,26]);
  const [failedScreenVisibility, setFailedScreenVisibility] = useState("hide");

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
    }, 1000);

    return () => clearInterval(interval);
  });

  function handleMovingRight(currentSP) {
    let nextNum = currentSP[currentSP.length - 1] + 1;
    let num = nextNum;
    while (num >= 10) {
      num = num % 10
    }

    if (num === 9) {
      setFailedScreenVisibility("show")
    } else {
      currentSP.shift();
      currentSP.push(nextNum);
    }
    setSnakePositions([...currentSP]);
  }

  function handleMovingLeft(currentSP) {
    let nextNum = currentSP[currentSP.length - 1] - 1;
    let num = nextNum;
    while (num >= 10) {
      num = num % 10
    }

    if (num === 0) {
      setFailedScreenVisibility("show")
    } else {
      currentSP.shift();
      currentSP.push(nextNum);
    }
    setSnakePositions([...currentSP]);
  }

  function handleMovingDown(currentSP) {
    let nextNum = currentSP[currentSP.length - 1] + 10;
    let num = nextNum;
    while (num >= 10) {
      num = Math.floor(num / 10)
    }

    if (num === 9) {
      setFailedScreenVisibility("show")
    } else {
      currentSP.shift();
      currentSP.push(nextNum);
    }
    setSnakePositions([...currentSP]);
  }

  function handleMovingUp(currentSP) {
    let nextNum = currentSP[currentSP.length - 1] - 10;
    let num = nextNum;
    console.log(num);


    if (num < 10) {
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
    }
  };

  const startNewGame = () => {
    setSnakePositions([23,24,25,26]);
    setFailedScreenVisibility("hide")
  };

  document.addEventListener('keydown', handleKeyPress);

  let cubes = () => {
    return [...Array(cubesNumber).keys()].map(i => (i === 0 || i === 9) ?
        <div className={"frame-top-bottom"}
             key={i}/> :
        <div className={"row"} key={i}>
          {[...Array(cubesNumber).keys()].map(j =>
              (j === 0 || j === 9) ?
              <div className={"frame-sides"}
                   key={i * 10 + j}/> :
              <div className={snakePositions.includes(i * 10 + j) ? "cube middle" : "cube"}
                   key={i * 10 + j}/>
          )}
        </div>
    );
  };

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