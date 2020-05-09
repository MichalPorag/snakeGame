module.exports = {
    paint: (findCurrentCube, snakePositions, board) => {
        for (let i = 0; i < snakePositions.length; i++) {
            let nextCubeToChange = findCurrentCube(snakePositions[i].row, snakePositions[i].column, board);
            const isSnake = nextCubeToChange.classList.value.includes("snake");
            if (nextCubeToChange && !isSnake) {
                nextCubeToChange.classList.remove("apple")
                nextCubeToChange.classList.add("snake");
            }
        }
    },

    increase: (setSnakePositions, snakeDirection, snakePositions) => {
        const snakeHead = snakePositions[snakePositions.length - 1];
        let newSnake = [...snakePositions];
        switch (snakeDirection) {
            case "right":
                snakeHead.column = snakeHead.column + 1;
                break;
            case "left":
                snakeHead.column = snakeHead.column - 1;
                break;
            case "up":
                snakeHead.row = snakeHead.row - 1;
                break;
            case "down":
                snakeHead.row = snakeHead.row + 1;
                break;
            default:
                break;
        }
        newSnake.push(snakeHead);
        setSnakePositions(newSnake);
    },

    updatePosition: (snakeHead, snakePositions, setSnakePositions, resetCubeStyle, board) => {
        let currentSP = [...snakePositions];
        let lastCube = currentSP.shift();
        currentSP.push(snakeHead);
        setSnakePositions([...currentSP]);
        resetCubeStyle(lastCube.row, lastCube.column, board);
    },

    getNextHeadPosition: (direction, snakePositions) => {
        let nextCube = {...snakePositions[snakePositions.length - 1]};
        switch (direction) {
            case "left":
                nextCube.column -= 1;
                break;
            case "right":
                nextCube.column += 1;
                break;
            case "down":
                nextCube.row += 1;
                break;
            case "up":
                nextCube.row -= 1;
                break;
            default:
                break;
        }
        return nextCube;
    },

    destroy: (findCurrentCube, snakePositions, board) => {
        for (let i = 0; i < snakePositions.length; i++) {
            let cubeToRest = findCurrentCube(snakePositions[i].row, snakePositions[i].column, board);
            cubeToRest.classList = "cube";
            // resetCubeStyle(cubeToRest);
        }
    },
};