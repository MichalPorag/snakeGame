import React, {useState, useEffect, useRef} from 'react';
import '../../scss/app.scss';

import useInterval from '../../hooks/useInterval';

import utilsFunctions from "../../utils/utilsFunctions";
import validation from "../../utils/validation";
// import sounds from "../../utils/sounds";
import snake from "./Snake";
import apple from "./Apple";
// import trees from "./Trees";
// import walls from "./walls";
// import houses from "./houses";

import GameOverScreen from "../GameOverScreen";
import Settings from "../Settings";
import SoundButton from "../SoundButton";

function Game({NUMBER_OF_LINES}) {
    const [snakePositions, setSnakePositions] = useState();
    const [snakeDirection, setSnakeDirection] = useState();
    const [applePositions, setApplePositions] = useState();
    const [isGameOver, setIsGameOver] = useState(true);
    // const [openScreen, setOpenScreen] = useState("GameOverScreen");
    const [isSoundActive, setSoundActive] = useState();
    // const [mode, setMode] = useState();
    // const [level, setLevel] = useState();
    const board = useRef();

    useEffect(() => {
        setSoundActive(false);

        document.addEventListener('keyup',
            (e) => handleKeyPress(e, isGameOver));

        return () => {
            window.removeEventListener('keyup', handleKeyPress);
        }
    }, []);

    useEffect(() => {
        if (snakePositions) {
            snake.paint(utilsFunctions.findCurrentCube, snakePositions, board);
            apple.paint(utilsFunctions.findCurrentCube, applePositions, board);
            // paintTreesOnTheBoard();
            // paintWallsOnTheBoard();
            // paintHousesOnTheBoard();
        }
    }, [snakePositions]);

    useInterval(() => {
        console.log("I am at useInterval");
        const snakeHead = snake.getNextHeadPosition(snakeDirection, snakePositions);
        if (validation.isSnakeHeadPositionValid(snakeHead, snakeDirection, snakePositions, NUMBER_OF_LINES)) {
            snake.updatePosition(snakeHead, snakePositions, setSnakePositions, utilsFunctions.resetCubeStyle, board);
            // if (validation.isEqualToApplePosition(snakeHead, applePositions)) {
            //     apple.destroy();
            //     snake.increase();
            //     apple.updatePosition();
            //     if (isSoundActive) {
            //         sounds.playBurpSound();
            //     }
            // }
        } else {
            gameOver();
        }
    }, isGameOver? null : 5000);

    const startNewGame = () => {
        setIsGameOver(false);
        // if (snakePositions) {
        //     resetBoard();
        // }
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

    const handleKeyPress = (e) => {
        const {key} = e;
        console.log(`key: ${key}`);
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
        if (key === "Enter" && isGameOver) {
            startNewGame();
        }
    };

    const handleStartNewGameButtonClicked = () => {
        startNewGame();
    };

    /**
     * Toggle isSoundActive useState.
     */
    const handleSoundButtonClicked = () => {
        return isSoundActive ?
            setSoundActive(false) :
            setSoundActive(true);
    };

    /**
     * Reset board style.
     */
    const resetBoard = () => {
        apple.destroy(board, applePositions, utilsFunctions.findCurrentCube);
        snake.destroy();
        // trees.destroy();
        // houses.destroy();
        // walls.destroy();
    };

    // /**
    //  * Return the screen the user requested to open or null
    //  * if the user didn't request to open any screen.
    //  *
    //  * TODO: create the logic of the function
    //  */
    // const showRelevantScreen = () => {
    //     switch (openScreen) {
    //         case "GameOverScreen":
    //             return <GameOverScreen />;
    //             break;
    //         case "settings":
    //             return <Settings />;
    //             break;
    //         default:
    //             return null;
    //             break;
    //     }
    // };

    return (
        <>
            <main>
                <SoundButton
                    isSoundActive={isSoundActive}
                    soundButtonClicked={handleSoundButtonClicked} />
                <div  ref={board}>
                    {setCubes()}
                </div>
            </main>
            {/*{showRelevantScreen}*/}
            {isGameOver ?
                <GameOverScreen
                startAgainClicked={handleStartNewGameButtonClicked}/> :
                null}
        </>
    );
}

export default Game;