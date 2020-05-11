import React, {useState, useEffect, useRef} from 'react';
import '../../scss/app.scss';

import useInterval from '../../hooks/useInterval';

import utilsFunctions from "../../utils/utilsFunctions";
import validation from "../../utils/validation";
import sounds from "../../utils/sounds";
import snake from "./Snake";
import apple from "./Apple";
// import trees from "./Trees";
// import walls from "./walls";
// import houses from "./houses";

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
    const [mode, setMode] = useState();
    const [score, setScore] = useState(0);
    const [key, setKey] = useState();
    const board = useRef();

    useEffect(() => {
        document.addEventListener('keyup',
            (e) => {
                handleKeyPress(e);
            });

            const handleKeyPress = (e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight" ||
                    e.key === "ArrowDown" || e.key === "ArrowUp" ||
                    e.key === "Enter") {
                    setKey(e.key);
                }
            };

        if (snakePositions && !isGameOver) {
            snake.paint(utilsFunctions.findCurrentCube, snakePositions, board);
            apple.paint(utilsFunctions.findCurrentCube, applePositions, board);
            // paintTreesOnTheBoard();
            // paintWallsOnTheBoard();
            // paintHousesOnTheBoard();
        }

        return () => {
            window.removeEventListener('keyup', handleKeyPress);
        }
    }, [snakePositions, isGameOver, applePositions, key]);

    useInterval(() => {
        console.log(key);
        handleKeyChange(key);
        const snakeNextHead = snake.getNextHeadPosition(snakeDirection, snakePositions);
        if (validation.isSnakeHeadPositionValid(snakeNextHead,
                                                snakeDirection,
                                                snakePositions,
                                                NUMBER_OF_LINES)) {
            // const isSnakeBodyPositionUpdates = await snake.updateBodyPosition(snakeNextHead,
            snake.updateBodyPosition(snakeNextHead,
                snakePositions,
                setSnakePositions,
                utilsFunctions.resetCubeStyle,
                board);
            if (validation.isEqualToApplePosition(snakeNextHead,applePositions)) {
                apple.destroy(utilsFunctions.findCurrentCube,
                              applePositions,
                              board);
                snake.increase(setSnakePositions,
                               snakeDirection,
                               snakePositions);
                apple.updatePosition(validation.isApplePositionValid,
                                     utilsFunctions.getRandomCube,
                                     setApplePositions,
                                     snakePositions,
                                     applePositions,
                                     NUMBER_OF_LINES);
                setScore(score + 1);
                if (isSoundActive) {
                    sounds.playBurpSound();
                }
            }
        } else {
            utilsFunctions.gameOver(setIsGameOver);
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
        setIsGameOver(true);
    };

    const handleKeyChange = () => {
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

    const handleStartNewGameButtonClicked = (gameSettings) => {
        setLevel(gameSettings.level);
        setMode(gameSettings.mode);
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
        console.log("I clicked");
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
        // trees.destroy();
        // houses.destroy();
        // walls.destroy();
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
                </div>
            </main>
            {
                isGameOver && !isSettingsScreenOpen ?
                <GameOverScreen
                startAgainClicked={handleStartNewGameButtonClicked}/> :
                null
            }
            {
                isSettingsScreenOpen ?
                    <Settings startGameClicked={handleStartNewGameButtonClicked}
                              level={level}
                              mode={mode}/> :
                    null
            }

        </>
    );
}

export default Game;