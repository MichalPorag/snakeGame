module.exports = {
    paint: (findCurrentCube, snakePositions, board) => {
        for (let i = 0; i < snakePositions.length; i++) {
            let nextCubeToChange = findCurrentCube(snakePositions[i].row, snakePositions[i].column, board);
            const isSnake = nextCubeToChange.classList.value.includes("snake");
            if (nextCubeToChange && !isSnake) {
                nextCubeToChange.classList.add("snake");
            }
        }
    },

    increase: (snakeDirection, snakePositions, setSnakePositions) => {
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
        console.log(`nextCube before: ${JSON.stringify(nextCube)}`);
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
        console.log(`nextCube after: ${JSON.stringify(nextCube)}`);
        return nextCube;
    },

    destroy: (snakePositions, board, findCurrentCube) => {
        for (let i = 0; i < snakePositions.length; i++) {
            let cubeToRest = findCurrentCube(snakePositions[i], board);
            cubeToRest.classList = "cube";
            // resetCubeStyle(cubeToRest);
        }
    },
};