import React, {useState, useEffect} from 'react';
import './scss/app.scss';

import GameOverScreen from "./components/GameOverScreen";

function App() {
  const NUMBER_OF_LINES = 25;
  const [snakeDirection, setSnakeDirection] = useState("down");
  const [snakePositions, setSnakePositions] = useState([712,812,912,1012]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [applePositions, setApplePositions] = useState(getRandomCube());
  // const [treesObjectPositions, setTreesObjectPositions] = useState([]);
  const [isSoundActive, setSoundActive] = useState(false);
  const [isEnterClicked, updatedEnterClicked] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSnakeHeadPositionValid(getSnakeHeadNewPosition())) {
        updateSnakeBodyPosition();
        if (isPositionEqualToApplePosition(getSnakeHeadNewPosition())) {
          increaseSnakeBody();
          updateApplePosition();
          if (isSoundActive) {
            playBurpSound();
          }
        }
      } else {
        gameOver();
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  const getSnakeHeadNewPosition = () => {
    let nextCube = 0;
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
  const isSnakeHeadPositionValid = (snakeHeadPositionToCheck) => {
    return !(isPositionEqualToFrameOfBoard(snakeHeadPositionToCheck) ||
           isPositionEqualToSnakePosition(snakeHeadPositionToCheck))
  };

  /*Update snake functions*/
  function updateSnakeBodyPosition() {
      let currentSP = [...snakePositions];
      currentSP.shift();
      currentSP.push(getSnakeHeadNewPosition());
      setSnakePositions([...currentSP]);
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

  //TODO: Fix multiply clicked!
  const handleKeyPress = (e) => {
    console.log("I am at handleKeyPress");
    if (!isGameOver) {
      switch (e.key) {
        case "ArrowLeft":
          if (snakeDirection !== "right" && snakeDirection !== "left") {
            console.log("ArrowLeft");
            setSnakeDirection("left");
          }
          break;
        case "ArrowRight":
          if (snakeDirection !== "left" && snakeDirection !== "right") {
            console.log("ArrowRight");
            setSnakeDirection("right");
          }
          break;
        case "ArrowDown":
          if (snakeDirection !== "up" && snakeDirection !== "down") {
            console.log("ArrowDown");
            setSnakeDirection("down");
          }
          break;
        case "ArrowUp":
          if (snakeDirection !== "down" && snakeDirection !== "up") {
            console.log("ArrowUp");
            setSnakeDirection("up");
          }
          break;
      }
    }
    if (e.key === "Enter" && isGameOver && !isEnterClicked) {
      console.log("Enter");
      startNewGame();
      updatedEnterClicked(true);
    }
  };

  function setCubeClass(snakePositions, i, j) {
    let classToReturn = `cube ${(i * 100) + j}`;
    if ((i * 100 + j) === applePositions) {
      classToReturn += ` apple`
    }
    if (snakePositions.includes(i * 100 + j)) {
      classToReturn += ` middle`
    }
    if (i === 0 || i === NUMBER_OF_LINES || j === 0 || j === NUMBER_OF_LINES) {
      classToReturn += ` frame`
    }
    return classToReturn;
  }

  let setCubes = () => {
    return [...Array(NUMBER_OF_LINES).keys()].map(i => (i === 0 || i === (NUMBER_OF_LINES - 1)) ?
        <div className={"frame-top-bottom"}
             key={i}/> :
        <div className={`row ${i * 100}`} key={i * 100}>
          {[...Array(NUMBER_OF_LINES).keys()].map(j =>
              (j === 0 || j === (NUMBER_OF_LINES - 1)) ?
              <div className={`frame-sides ${(i * 100) + j}`}
                   key={(i * 100) + j}/> :
              <div className={setCubeClass(snakePositions, i, j)}
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
    updatedEnterClicked(false);
  };

  const startNewGame = () => {
    setSnakePositions([1015,915,815,715]);
    setSnakeDirection("down");
    setIsGameOver(false);
  };

  /*Sounds Functions*/
  const playSadSound = () => {
    // const sad = new Audio("https://www.fesliyanstudios.com/play-mp3/5645");
    // sad.play().catch(e => console.error(e));
  }

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
    <React.Fragment>
      <button id={"BTN-disabled-audio"}
              className={isSoundActive ? "unMute" : "mute"}
              onClick={handleSoundButtonClicked}/>
      <main>
        {setCubes()}
      </main>
      {isGameOver ?
          <GameOverScreen handleClicked={handleStartNewGameButtonClicked}/> :
          null
      }
    </React.Fragment>
  );
}

export default App;