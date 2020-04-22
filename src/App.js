import React, {useState, useEffect} from 'react';
import './scss/app.scss';

function App() {
  const cubesNumber = 25;
  const [snakeDirection, setSnakeDirection] = useState("");
  const [snakePositions, setSnakePositions] = useState([]);
  const [failedScreenVisibility, setFailedScreenVisibility] = useState("");
  const [applePositions, setApplePositions] = useState(0);
  // const [treesObjectPositions, setTreesObjectPositions] = useState([]);

  useEffect(() => {
    setSnakeDirection("down");
    setSnakePositions([1012,912,812,712]);
    setApplePositions(getRndCube());
    setFailedScreenVisibility("hide");
    // setTree(5);
  }, []);

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
    }, 50);

    return () => clearInterval(interval);
  });
  
  function handleMovingRight(currentSP) {
    let nextCube = currentSP[currentSP.length - 1] + 1;
    (nextCube % 100) === (cubesNumber - 1) ? playSadSound() : updateSnakePosition(currentSP, nextCube);
    setSnakePositions([...currentSP]);
  }

  function handleMovingLeft(currentSP) {
    let nextCube = currentSP[currentSP.length - 1] - 1;
    ((nextCube % 100) === 0) ? playSadSound() : updateSnakePosition(currentSP, nextCube);
    setSnakePositions([...currentSP]);
  }

  function handleMovingDown(currentSP) {
    let nextCube = currentSP[currentSP.length - 1] + 100;
    (Math.floor(nextCube / 100) === (cubesNumber - 1)) ? playSadSound() : updateSnakePosition(currentSP, nextCube);
    setSnakePositions([...currentSP]);
  }

  function handleMovingUp(currentSP) {
    let nextCube = currentSP[currentSP.length - 1] - 100;
    (Math.floor(nextCube / 100) === 0) ? playSadSound() : updateSnakePosition(currentSP, nextCube);
    setSnakePositions([...currentSP]);
  }

  function updateSnakePosition(currentSP, nextCube) {
    currentSP.shift();
    currentSP.push(nextCube);
  }

  const handleKeyPress = (e) => {
    console.log(failedScreenVisibility)
    if (failedScreenVisibility === "hide") {
      switch (e.key) {
        case "ArrowLeft":
          if (snakeDirection !== "right" || snakeDirection !== "left") {
            setSnakeDirection("left");
          }
          break;
        case "ArrowRight":
          if (snakeDirection !== "left" || snakeDirection !== "right") {
            setSnakeDirection("right");
          }
          break;
        case "ArrowDown":
          if (snakeDirection !== "up" || snakeDirection !== "down") {
            setSnakeDirection("down");
          }
          break;
        case "ArrowUp":
          if (snakeDirection !== "down" || snakeDirection !== "up") {
            setSnakeDirection("up")
          }
          break;
      }
    }
    if (e.key === "Enter" && failedScreenVisibility === "show") {
      startNewGame();
    }
  };

  const startNewGame = () => {
    setSnakePositions([1015,915,815,715]);
    setSnakeDirection("down");
    setFailedScreenVisibility("hide");
  };

  function setCubeClass(snakePositions, i, j) {
    let classToReturn = "";
    if ((i * 100 + j) === applePositions) {
      classToReturn = `cube middle ${(i * 100) + j} apple`
    } else if (snakePositions.includes(i * 100 + j)) {
      classToReturn = `cube middle ${(i * 100) + j}`
    } else {
      classToReturn = `cube ${(i * 100) + j}`
    }
    return classToReturn;
  }

  document.addEventListener('keydown', handleKeyPress);

  let setCubes = () => {
    return [...Array(cubesNumber).keys()].map(i => (i === 0 || i === (cubesNumber - 1)) ?
        <div className={"frame-top-bottom"}
             key={i}/> :
        <div className={`row ${i * 100}`} key={i * 100}>
          {[...Array(cubesNumber).keys()].map(j =>
              (j === 0 || j === (cubesNumber - 1)) ?
              <div className={`frame-sides ${(i * 100) + j}`}
                   key={(i * 100) + j}/> :
              <div className={setCubeClass(snakePositions, i, j)}
                   key={(i * 100) + j}/>
          )}
        </div>
    );
  };

  function getRndCube() {
    let unitsAndTens = getRndInteger(1, cubesNumber - 2);
    let hundredsAndThousands = getRndInteger(1, cubesNumber - 2) * 100;
    return hundredsAndThousands + unitsAndTens;
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function playSadSound() {
    // const sad = new Audio("https://www.fesliyanstudios.com/play-mp3/5645");
    // sad.play().catch(e => console.error(e));
    setFailedScreenVisibility("show")
  }

  if (snakePositions[snakePositions.length - 1] === applePositions) {
    switch (snakeDirection) {
      case "right":
        setSnakePositions([...snakePositions, snakePositions[snakePositions.length - 1] + 1]);
        break;
      case "left":
        setSnakePositions([...snakePositions, snakePositions[snakePositions.length - 1] - 1]);
        break;
      case "up":
        setSnakePositions([...snakePositions, snakePositions[snakePositions.length - 1] - 100]);
        break;
      case "down":
        setSnakePositions([...snakePositions, snakePositions[snakePositions.length - 1] + 100]);
        break;
    }
    setApplePositions(getRndCube());
    window.setTimeout(function() {
      const burp = new Audio("https://www.fesliyanstudios.com/play-mp3/5759");
      burp.play().catch(e => console.error(e));
      }, 100);
  }

  return (
    <React.Fragment>
      <main>
        {setCubes()}
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