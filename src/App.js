import React, {useState, useEffect, useRef} from 'react';
import './scss/app.scss';

import Game from "./components/Game/Game";
import GameOverScreen from "./components/GameOverScreen";
import useInterval from './hooks/useInterval';

import logic from "./utils/utilsFunctions";
import validation from "./utils/validation";
import sounds from "./utils/sounds";

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

  /*Start and finish games*/
  const gameOver = () => {
    // playSadSound();
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
    setApplePositions(logic.getRandomCube(1, NUMBER_OF_LINES - 2));
  };

  const handleStartNewGameButtonClicked = () => {
    startNewGame()
  };

  const handleSoundButtonClicked = () => {
    return isSoundActive ? setSoundActive(false) : setSoundActive(true);
  };

  return (
    <>
      <button className={`BTN-audio ${isSoundActive ? "unMute" : "mute"}`}
              onClick={handleSoundButtonClicked}/>
      <Game board={board}
            NUMBER_OF_LINES={NUMBER_OF_LINES}
            />
      {isGameOver ?
          <GameOverScreen handleClicked={handleStartNewGameButtonClicked}/> :
          null
      }
    </>
  );
}

export default App;