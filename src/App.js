import React, {useState, useEffect, useRef} from 'react';
import './scss/app.scss';

import GameOverScreen from "./components/GameOverScreen";
import useInterval from './hooks/useInterval';

function App() {
  const NUMBER_OF_LINES = 25;
  const [snakePositions, setSnakePositions] = useState();
  const [snakeDirection, setSnakeDirection] = useState();
  const [isGameOver, setIsGameOver] = useState();
  const [applePositions, setApplePositions] = useState();
  const [isSoundActive, setSoundActive] = useState();
  const board = useRef();
  console.log("Render isGameOver:",isGameOver)


  useEffect(() => {
    startNewGame();
    setSoundActive(false);

    document.addEventListener('keyup', (e) => handleKeyPress(e));

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (snakePositions) {
      paintSnake();
      paintApple();
      // paintTreesOnTheBoard();
      // paintWallsOnTheBoard();
      // paintHousesOnTheBoard();
    }
  });

  useInterval(() => {
    const snakeHead = getSnakeHeadNewPosition();
    if (isSnakeHeadPositionValid(snakeHead)) {
      updateSnakeBodyPosition(snakeHead);
      if (isPositionEqualToApplePosition(snakeHead)) {
        cleanApple();
        increaseSnakeBody();
        updateApplePosition();
        if (isSoundActive) {
          playBurpSound();
        }
      }
    } else {
      gameOver();
    }
  }, isGameOver? null : 100);

  const getSnakeHeadNewPosition = () => {
    let nextCube;
    switch (snakeDirection) {
      case "left":
        nextCube = snakePositions[snakePositions.length - 1] - 1;
        break;
      case "right":
        nextCube = snakePositions[snakePositions.length - 1] + 1;
        break;
      case "down":
        nextCube = snakePositions[snakePositions.length - 1] + 100;
        break;
      case "up":
        nextCube = snakePositions[snakePositions.length - 1] - 100;
        break;
      default:
        break;
    }
    return nextCube;
  };

  /*Run test on specific cube*/
  const isPositionEqualToApplePosition = (cubeToCheck) => {
    return cubeToCheck === applePositions;
  };

  const isPositionEqualToFrameOfBoard = (cubeToCheck) => {
    let isSnakeHeadTouchFrame = false;
    switch (snakeDirection) {
      case "left":
        isSnakeHeadTouchFrame = (cubeToCheck % 100) === 0;
        break;
      case "right":
        isSnakeHeadTouchFrame = (cubeToCheck % 100) === (NUMBER_OF_LINES - 1);
        break;
      case "down":
        isSnakeHeadTouchFrame = Math.floor(cubeToCheck / 100) === (NUMBER_OF_LINES - 1);
        break;
      case "up":
        isSnakeHeadTouchFrame = Math.floor(cubeToCheck / 100) === 0;
        break;
      default:
        break;
    }
    return isSnakeHeadTouchFrame;
  };

  const isPositionEqualToSnakePosition = (cubeToCheck) => {
    return snakePositions.includes(cubeToCheck);
  };

  /**
   * Apple position is valid if it is not in the same cube as
   * the snake, apple or tree.
   */
  const isApplePositionValid = (applePositionToCheck) => {
    return !(isPositionEqualToSnakePosition(applePositionToCheck) &&
           isPositionEqualToApplePosition(applePositionToCheck))
  };

  /**
   * Snake position is valid if it is not in the same cube as
   * the snake, apple or tree.
   */
  const isSnakeHeadPositionValid = (snakeHead) => {
    return !(isPositionEqualToFrameOfBoard(snakeHead) ||
           isPositionEqualToSnakePosition(snakeHead))
  };

  /*Update snake functions*/
  function updateSnakeBodyPosition(snakeHead) {
      let currentSP = [...snakePositions];
      let lastCube = currentSP.shift();
      currentSP.push(snakeHead);
      setSnakePositions([...currentSP]);
      resetCubeStyle(lastCube);
  }

  const increaseSnakeBody = () => {
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
      default:
        break;
    }
  };

  /**Get in to recursion until the cube the is valid*/
  const updateApplePosition = () => {
    let newRandomCube = getRandomCube();
    if (isApplePositionValid(newRandomCube)) {
      setApplePositions(newRandomCube);
    } else {
      updateApplePosition();
    }
  };

  const handleKeyPress = (e) => {
    const {key} = e;
    console.log(`>>>>>>>>>>>isGameOver:,${isGameOver}, is Enter: ${key === "Enter"}, ${key === "Enter" && isGameOver}`);
    if (key === "Enter" && isGameOver) {
      console.log(`${key} clicked`);
      console.log("Enter");
      startNewGame();
    }
    if (!isGameOver) {
      console.log("key: ",key);
      switch (key) {
        case "ArrowLeft":
          if (snakeDirection !== "right" && snakeDirection !== "left") {
            setSnakeDirection("left");
          }
          break;
        case "ArrowRight":
          if (snakeDirection !== "left" && snakeDirection !== "right") {
            setSnakeDirection("right");
          }
          break;
        case "ArrowDown":
          if (snakeDirection !== "up" && snakeDirection !== "down") {
            setSnakeDirection("down");
          }
          break;
        case "ArrowUp":
          if (snakeDirection !== "down" && snakeDirection !== "up") {
            setSnakeDirection("up");
          }
          break;
        default:
          break;
      }
    }
    // if (key === "Enter" && isGameOver) {
    //   console.log(`${key} clicked`);
    //   console.log("Enter");
    //   startNewGame();
    // }
  };

  const cleanBoard = () => {
    cleanApple();
    cleanSnake();
    // cleanApple();
    // cleanTrees();
    // cleanHouses();
    // cleanWalls();
  };

  const cleanSnake = () => {
    for (let i = 0; i < snakePositions.length; i++) {
      let cubeToRest = findCurrentCube(snakePositions[i]);
      cubeToRest.classList = "cube";
      // resetCubeStyle(cubeToRest);
    }
  };

  const cleanApple = () => {
    let cubeToRest = findCurrentCube(applePositions);
    cubeToRest.classList = "cube";
  };

  let setCubes = () => {
    return [...Array(NUMBER_OF_LINES).keys()].map(i => (i === 0 || i === (NUMBER_OF_LINES - 1)) ?
        <div className={"frame-top-bottom"}
             key={i}/> :
        <div className={`row i-${i}`} key={i * 100}>
          {[...Array(NUMBER_OF_LINES).keys()].map(j =>
              (j === 0 || j === (NUMBER_OF_LINES - 1)) ?
              <div className={`frame-sides i-${i} j-${j}`}
                   key={(i * 100) + j}/> :
              <div className={"cube"}
                   key={(i * 100) + j}/>
          )}
        </div>
    );
  };

  function getRandomCube() {
    let unitsAndTens = getRndInteger(1, NUMBER_OF_LINES - 2);
    let hundredsAndThousands = getRndInteger(1, NUMBER_OF_LINES - 2) * 100;
    return hundredsAndThousands + unitsAndTens;
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const gameOver = () => {
    playSadSound();
    setIsGameOver(true);
  };

  const startNewGame = () => {
    setIsGameOver(false);
    console.log(`game over: ${isGameOver}`);
    if (snakePositions) {
      cleanBoard();
    }
    setSnakeDirection( "down");
    setSnakePositions([715,815,915,1015]);
    setApplePositions(getRandomCube());
  };

  const resetCubeStyle = (cube) => {
    findCurrentCube(cube).classList = "cube";
  };

  const paintSnake = () => {
    for (let i = 0; i < snakePositions.length; i++) {
      let nextCubeToChange = findCurrentCube(snakePositions[i]);
      const isSnake = nextCubeToChange.classList.value.includes("snake");
      if (nextCubeToChange && !isSnake) {
        nextCubeToChange.classList.add("snake");
      }
    }
  };

  const paintApple = () => {
    let cubeToChange = findCurrentCube(applePositions);
    if (cubeToChange) {
      cubeToChange.classList.add("apple");
    }
  };

  const findCurrentCube = (cubeNumber) => {
    let currentRow = Math.floor(cubeNumber / 100);
    let currentColumn = Math.floor(cubeNumber % 100);
    let currentCube;
    if (board.current.children[currentRow].children[currentColumn]) {
      currentCube = board.current.children[currentRow].children[currentColumn];
    }
    return currentCube;
  };

  /*Sounds Functions*/
  const playSadSound = () => {
    // const sad = new Audio("https://www.fesliyanstudios.com/play-mp3/5645");
    // sad.play().catch(e => console.error(e));
  };

  const playBurpSound = () => {
    window.setTimeout(function () {
      const burp = new Audio("https://www.fesliyanstudios.com/play-mp3/5759");
      burp.play().catch(e => console.error(e));
    }, 100);
  };

  /*Handle buttons Clicks Functions*/
  const handleSoundButtonClicked = () => {
    return isSoundActive ? setSoundActive(false) : setSoundActive(true);
  };

  const handleStartNewGameButtonClicked = () => {
    startNewGame()
  };

  /*JSX*/
  return (
    <>
      <button
              className={`BTN-audio ${isSoundActive ? "unMute" : "mute"}`}
              onClick={handleSoundButtonClicked}/>
      <main ref={board}>
        {setCubes()}
      </main>
      {isGameOver ?
          <GameOverScreen handleClicked={handleStartNewGameButtonClicked}/> :
          null
      }
    </>
  );
}

export default App;