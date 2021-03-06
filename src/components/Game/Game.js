import React, {useState, useEffect, useRef} from 'react';
import '../../scss/app.scss';

import useInterval from '../../hooks/useInterval';

import utilsFunctions from "../../utils/utilsFunctions";
import validation from "../../utils/validation";
import sounds from "../../utils/sounds";
import snake from "./Snake";
import apple from "./Apple";
import SocialNetworksLinks from "./SocialNetworksLinks";
import Portal from "./Modes/Portal";
import Village from "./Modes/Village";

import DataContainer from "./DataContainer/DataContainer";
import GameOverScreen from "./GameOverScreen";
import Settings from "./Settings";

function Game({NUMBER_OF_LINES}) {
    const [snakePositions, setSnakePositions] = useState();
    const [snakeDirection, setSnakeDirection] = useState();
    const [applePositions, setApplePositions] = useState();
    const [isGameOver, setIsGameOver] = useState(true);
    const [isSettingsScreenOpen, setSettingsScreen] = useState(false);
    const [isSoundActive, setSoundActive] = useState(false);
    const [level, setLevel] = useState("beginners");
    const [mode, setMode] = useState("classic");
    const [score, setScore] = useState(0);
    const [isFirstGame, setFirstGame] = useState(true);
    const board = useRef();
    // const WALLS = {
    //   top: 6,
    //   right: 18,
    //   bottom: 18,
    //   left: 6
    // };

    useEffect(() => {
        document.addEventListener('keyup', handleKeyPress);

        if (snakePositions && !isGameOver) {
            snake.paint(utilsFunctions.findCurrentCube, snakePositions, board);
            apple.paint(utilsFunctions.findCurrentCube, applePositions, board);
            // paintTreesOnTheBoard();
            // paintWallsOnTheBoard();
            // paintHousesOnTheBoard();
        }

        return () => {
            document.removeEventListener('keyup', handleKeyPress);
        }
    }, [snakePositions, isGameOver, applePositions]);

    useInterval(() => {
        const snakeHead = snake.getNextHeadPosition(snakeDirection, snakePositions);
        if (validation.isSnakeHeadPositionValid(snakeHead, snakeDirection, snakePositions, mode, NUMBER_OF_LINES)) {
            // if (validation.isSnakeTouchWall(WALLS, snakePositions)) {
            //     console.log(">>>>>>>> The snake touched the wall");
            // }
            snake.updatePosition(snakeHead, snakePositions, setSnakePositions, utilsFunctions.resetCubeStyle, board);
            if (validation.isEqualToApplePosition(snakeHead,applePositions)) {
                apple.destroy(utilsFunctions.findCurrentCube, applePositions, board);
                snake.increase(setSnakePositions,snakeDirection, snakePositions);
                apple.updatePosition(validation.isApplePositionValid, utilsFunctions.getRandomCube, setApplePositions, snakePositions, applePositions, NUMBER_OF_LINES);
                setScore(score + 1);
                if (isSoundActive) {
                    sounds.playBurpSound();
                }
            }
        } else {
            gameOver();
        }
    }, isGameOver? null : utilsFunctions.getSpeed(level));

    const startNewGame = () => {
        setIsGameOver(false);
        if (snakePositions) {
            resetBoard();
        }
        setSnakeDirection( "down");
        setSnakePositions(
            [
                {row: 7, column: 15},
                {row: 8, column: 15},
                {row: 9, column: 15},
                {row: 10, column: 15}
            ]
        );
        setApplePositions(utilsFunctions.getRandomCube(1, NUMBER_OF_LINES - 2));
    };

    const setCubes = () => {
        return [...Array(NUMBER_OF_LINES).keys()]
            .map(i => (i === 0 || i === (NUMBER_OF_LINES - 1)) ?
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

    const gameOver = () => {
        if (isFirstGame) {
            setFirstGame(false)
        }
        setIsGameOver(true);
    };

    const handleKeyPress = (e) => {
        const {key} = e;
        if (!isGameOver) {
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
        if (key === "Enter" && isGameOver) {
            startNewGame();
        }
    };

    const handleStartNewGameButtonClicked = () => {
        setSettingsScreen(false);
        startNewGame();
    };

    /**
     * Toggle isSoundActive useState.
     */
    const handleSoundButtonClicked = () => {
        isSoundActive ?
            setSoundActive(false) :
            setSoundActive(true);
    };

    const handleSettingsButtonClicked = () => {
        isSettingsScreenOpen ?
            setSettingsScreen(false) :
            setSettingsScreen(true);
    };

    /**
     * Reset board style.
     */
    const resetBoard = () => {
        setScore(0);
        apple.destroy(utilsFunctions.findCurrentCube, applePositions, board);
        snake.destroy(utilsFunctions.findCurrentCube, snakePositions, board);
    };

    const getMode = () => {
        if (mode === "portal") {
            return <Portal isGameOver={isGameOver} />;
        } else if (mode ===  "village") {
            return <Village isGameOver={isGameOver}  />;
        } else {
        }
    };

    const HandleLevelChange = (e) => {
        const buttonsName = e.target.innerHTML.toLowerCase();
        if (buttonsName === "advanced") {
            setLevel("advanced");
        } else if (buttonsName === "averages") {
            setLevel("averages");
        } else {
            setLevel("beginner");
        }
    };

    const HandleModeChange = (e) => {
        const buttonsName = e.target.innerHTML.toLowerCase();
        if (buttonsName.includes("village")) {
            setMode("village");
        } else if (buttonsName.includes("portal")) {
            setMode("portal");
        } else {
            setMode("classic");
        }
    };

    return (
        <>
            <main>
                <DataContainer
                    isSoundActive={isSoundActive}
                    soundButtonClicked={handleSoundButtonClicked}
                    settingsButtonClicked={handleSettingsButtonClicked}
                    score={score}/>
                <div id={"board-container"}
                     ref={board}>
                    {setCubes()}
                    {getMode()}
                </div>
            </main>
            {
                isGameOver && !isSettingsScreenOpen ?
                <GameOverScreen startAgainClicked={handleStartNewGameButtonClicked}
                                isFirstGame={isFirstGame}
                                isGameOver={isGameOver}/> :
                null
            }
            {
                isSettingsScreenOpen ?
                    <Settings startAgainClicked={handleStartNewGameButtonClicked}
                              level={level}
                              changeLevel={e => HandleLevelChange(e)}
                              mode={mode}
                              changeMode={e => HandleModeChange(e)}
                              goBackClicked={handleStartNewGameButtonClicked}
                              isGameOver={isGameOver}/> :
                    null
            }
            <SocialNetworksLinks />
        </>
    );
}

export default Game;
