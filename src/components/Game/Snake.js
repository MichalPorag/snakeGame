module.exports = {
    paint: (findCurrentCube, snakePositions, board) => {
        for (let i = 0; i < snakePositions.length; i++) {
            const cube = findCurrentCube(snakePositions[i].row, snakePositions[i].column, board);
            cube.classList = ["cube"];
            // const isSnake = cube.classList.value.includes("snake");
            // console.log("cube.classList before: ", cube.classList);
            // console.log("cube.classList after: ", cube.classList);
            // if (cube && !isSnake) {
            if (cube) {
                cube.classList.add("snake");
            }
            if (i === snakePositions.length - 1) {
                let snakeHeadClass = "snake-head-";
                if (snakePositions[i].row >  snakePositions[i - 1].row) {
                    snakeHeadClass += "down";
                }
                if (snakePositions[i].row <  snakePositions[i - 1].row) {
                    snakeHeadClass += "up";
                }
                if (snakePositions[i].column >  snakePositions[i - 1].column) {
                    snakeHeadClass += "right";
                }
                if (snakePositions[i].column <  snakePositions[i - 1].column) {
                    snakeHeadClass += "left";
                }
                cube.classList.add(snakeHeadClass);
            }
            if (i === snakePositions.length - 2) {

            }



            // if (snakePositions[i - 1].row !== snakePositions[i + 1].row &&
            //     snakePositions[i - 1].column !== snakePositions[i + 1].column) { //isCorner?
            //     if (snakePositions[i - 1].row > snakePositions[i + 1].row) { //bottom corner
            //         if (snakePositions[i - 1].column < snakePositions[i + 1].column) { //right corner
            //             if (snakePositions[i].column < snakePositions[i + 1].column) {
            //
            //             }
            //             if (snakePositions[i].row < snakePositions[i + 1].row) {
            //
            //             }
            //         } else { //left corner
            //
            //         }
            //     } else { //top corner
            //         if (snakePositions[i - 1].column < snakePositions[i + 1].column) { //right corner
            //
            //         } else { //left corner
            //
            //         }
            //     }
            // }
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

    updateBodyPosition: (snakeHead, snakePositions, setSnakePositions, resetCubeStyle, board) => {
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