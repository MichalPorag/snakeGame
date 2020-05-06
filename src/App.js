import React, {useState, useEffect, useRef} from 'react';
import './scss/app.scss';

// import Game from "./components/Game/Game";
import GameOverScreen from "./components/GameOverScreen";
import useInterval from './hooks/useInterval';

import logic from "./logic";
import validation from "./validation";
import sounds from "./validation";

function App() {
  const NUMBER_OF_LINES = 25;
  const [snakePositions, setSnakePositions] = useState();
  const [snakeDirection, setSnakeDirection] = useState();
  const [isGameOver, setIsGameOver] = useState();
  const [applePositions, setApplePositions] = useState();
  const [isSoundActive, setSoundActive] = useState();
  const board = useRef();
  console.log("Render isGameOver:",isGameOver);


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
    const snakeHead = logic.getSnakeHeadNewPosition(snakeDirection, snakePositions);
    if (validation.isSnakeHeadPositionValid(snakeHead, snakeDirection, snakePositions, NUMBER_OF_LINES)) {
      updateSnakeBodyPosition(snakeHead);
      if (validation.isEqualToApplePosition(snakeHead, applePositions)) {
        cleanApple();
        increaseSnakeBody();
        updateApplePosition();
        if (isSoundActive) {
          sounds.playBurpSound();
        }
      }
    } else {
      gameOver();
    }
  }, isGameOver? null : 100);

  //TODO: move to Game component.
  /*Update snake functions*/
  function updateSnakeBodyPosition(snakeHead) {
      let currentSP = [...snakePositions];
      let lastCube = currentSP.shift();
      currentSP.push(snakeHead);
      setSnakePositions([...currentSP]);
      resetCubeStyle(lastCube);
  }

  //TODO: move to Game component.
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

  //TODO: move to Apple component.
  /**Get in to recursion until the cube the is valid*/
  const updateApplePosition = () => {
    let newRandomCube = logic.getRandomCube(1, NUMBER_OF_LINES - 2);
    if (validation.isApplePositionValid(newRandomCube, snakePositions, applePositions)) {
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

  //TODO: move to Game component.
  /*CleanUp functions*/
  const cleanBoard = () => {
    cleanApple();
    cleanSnake();
    // cleanApple();
    // cleanTrees();
    // cleanHouses();
    // cleanWalls();
  };

  //TODO: move to Snake component.
  const cleanSnake = () => {
    for (let i = 0; i < snakePositions.length; i++) {
      let cubeToRest = logic.findCurrentCube(snakePositions[i], board);
      cubeToRest.classList = "cube";
      // resetCubeStyle(cubeToRest);
    }
  };

  //TODO: move to Apple component.
  const cleanApple = () => {
    let cubeToRest = logic.findCurrentCube(applePositions, board);
    cubeToRest.classList = "cube";
  };

  //TODO: move to Game component.
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

  //TODO: move to GameOver component.
  /*Start and finish games*/
  const gameOver = () => {
    // playSadSound();
    setIsGameOver(true);
  };

  //TODO: move to Game component.
  const startNewGame = () => {
    setIsGameOver(false);
    console.log(`game over: ${isGameOver}`);
    if (snakePositions) {
      cleanBoard();
    }
    setSnakeDirection( "down");
    setSnakePositions([715,815,915,1015]);
    setApplePositions(logic.getRandomCube(1, NUMBER_OF_LINES - 2));
  };

  //TODO: move to Game component.
  /*Functions that change style*/
  const resetCubeStyle = (cube) => {
    logic.findCurrentCube(cube, board).classList = "cube";
  };

  //TODO: move to Snake component.
  const paintSnake = () => {
    for (let i = 0; i < snakePositions.length; i++) {
      let nextCubeToChange = logic.findCurrentCube(snakePositions[i], board);
      const isSnake = nextCubeToChange.classList.value.includes("snake");
      if (nextCubeToChange && !isSnake) {
        nextCubeToChange.classList.add("snake");
      }
    }
  };

  //TODO: move to Apple component.
  const paintApple = () => {
    let cubeToChange = logic.findCurrentCube(applePositions, board);
    if (cubeToChange) {
      cubeToChange.classList.add("apple");
    }
  };

  //TODO: move to GameOver component.
  const handleStartNewGameButtonClicked = () => {
    startNewGame()
  };



  /*Handle buttons Clicks Functions*/
  const handleSoundButtonClicked = () => {
    return isSoundActive ? setSoundActive(false) : setSoundActive(true);
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