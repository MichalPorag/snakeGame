module.exports = {
    getSnakeHeadNewPosition: (direction, snakePositions) => {
        let nextCube;
        switch (direction) {
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
            default:
                break;
        }
        return nextCube;
    },

    getRandomCube: (min, max) => {
        let unitsAndTens = module.exports.getRndInteger(min, max);
        let hundredsAndThousands = module.exports.getRndInteger(min, max) * 100;
        return hundredsAndThousands + unitsAndTens;
    },

    getRndInteger: (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    //TODO: Bad practice. change to the react way
    findCurrentCube: (cubeNumber, board) => {
        let currentRow = Math.floor(cubeNumber / 100);
        let currentColumn = Math.floor(cubeNumber % 100);
        let currentCube;
        if (board.current.children[currentRow].children[currentColumn]) {
            currentCube = board.current.children[currentRow].children[currentColumn];
        }
        return currentCube;
    }
};