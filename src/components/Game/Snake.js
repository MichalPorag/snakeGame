import React from 'react';
import './scss/app.scss';

import logic from "../../utils/utilsFunctions";
import validation from "../../utils/validation";

function Snake() {
    const paintSnake = () => {
        for (let i = 0; i < snakePositions.length; i++) {
            let nextCubeToChange = logic.findCurrentCube(snakePositions[i], board);
            const isSnake = nextCubeToChange.classList.value.includes("snake");
            if (nextCubeToChange && !isSnake) {
                nextCubeToChange.classList.add("snake");
            }
        }
    };

    const cleanSnake = () => {
        for (let i = 0; i < snakePositions.length; i++) {
            let cubeToRest = logic.findCurrentCube(snakePositions[i], board);
            cubeToRest.classList = "cube";
            // resetCubeStyle(cubeToRest);
        }
    };

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

    /*Update snake functions*/
    function updateSnakeBodyPosition(snakeHead) {
        let currentSP = [...snakePositions];
        let lastCube = currentSP.shift();
        currentSP.push(snakeHead);
        setSnakePositions([...currentSP]);
        resetCubeStyle(lastCube);
    }
}

export default Snake;