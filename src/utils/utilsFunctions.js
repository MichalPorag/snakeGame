module.exports = {
    getRandomCube: (min, max) => {
        let row = module.exports.getRandomInteger(min, max);
        let column = module.exports.getRandomInteger(min, max);
        return {
            row: row,
            column: column
        };
    },

    getRandomInteger: (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    //TODO: Bad practice. change to the react way
    findCurrentCube: (currentRow, currentColumn, board) => {
        if (board.current.children[currentRow].children[currentColumn]) {
            return board.current.children[currentRow].children[currentColumn];
        }
    },

    /*Functions that change style*/
    resetCubeStyle: (currentRow, currentColumn, board) => {
        module.exports.findCurrentCube(currentRow, currentColumn, board).classList = "cube";
    },

    getSpeed: (level) => {
        if (level === "advanced") {
            return 70;
        } else if (level === "averages") {
            return  200;
        } else {
            return  500;
        }
    }
};