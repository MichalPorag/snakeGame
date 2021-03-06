module.exports = {
    paint: (findCurrentCube, applePositions, board) => {
        let cubeToChange = findCurrentCube(applePositions.row, applePositions.column, board);
        if (cubeToChange) {
            cubeToChange.classList.add("apple");
        }
    },

    updatePosition: (isApplePositionValid, getRandomCube, setApplePositions, snakePositions, applePositions, NUMBER_OF_LINES) => {
        let newRandomCube = getRandomCube(1, NUMBER_OF_LINES - 2);
        if (isApplePositionValid(newRandomCube, snakePositions, applePositions)) {
            setApplePositions(newRandomCube);
        } else {
            module.exports.updatePosition();
        }
    },

    destroy: (findCurrentCube, applePositions, board) => {
        let cubeToRest = findCurrentCube(applePositions.row, applePositions.column, board);
        cubeToRest.classList = "cube";
    },
};