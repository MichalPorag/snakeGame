module.exports = {
    isEqualToApplePosition: (cube, applePositions) => {
        return cube.row === applePositions.row && cube.column === applePositions.column;
    },

    isEqualToFrameOfBoard: (cube, snakeDirection, snakePositions, NUMBER_OF_LINES) => {
        let isSnakeHeadTouchFrame = false;
        switch (snakeDirection) {
            case "left":
                isSnakeHeadTouchFrame = cube.column === 0;
                break;
            case "right":
                isSnakeHeadTouchFrame = cube.column === (NUMBER_OF_LINES - 1);
                break;
            case "down":
                isSnakeHeadTouchFrame = cube.row === (NUMBER_OF_LINES - 1);
                break;
            case "up":
                isSnakeHeadTouchFrame = cube.row === 0;
                break;
            default:
                break;
        }
        return isSnakeHeadTouchFrame;
    },

    isEqualToSnakeHeadPosition: (cube, snakePositions) => {
        for (const snakePart of snakePositions) {
            if (cube.row === snakePart.row && cube.column === snakePart.column) {
                return true;
            }
        }
        return false;
    },

    /**
     * Snake position is valid if it is not in the same cube as
     * the snake, apple or tree.
     */
    isSnakeHeadPositionValid: (snakeHead, snakeDirection, snakePositions, mode, NUMBER_OF_LINES) => {
        return !(
            module.exports.isEqualToFrameOfBoard(snakeHead, snakeDirection, snakePositions, NUMBER_OF_LINES) ||
            module.exports.isEqualToSnakeHeadPosition(snakeHead, snakePositions) ||
            module.exports.isSnakeTouchHouse(snakeHead, snakeDirection, mode, NUMBER_OF_LINES)
        )
    },

    /**
     * Apple position is valid if it is not in the same cube as
     * the snake, apple or tree.
     */
    isApplePositionValid: (newApplePositions, snakePositions, lastApplePosition) => {
        return !(module.exports.isEqualToSnakeHeadPosition(newApplePositions, snakePositions) &&
            module.exports.isEqualToApplePosition(newApplePositions, lastApplePosition))
    },

    isSnakeTouchHouse: (cube, snakeDirection, mode, NUMBER_OF_LINES) => {
        let isTouchHouse = false;
        if (mode === "village") {
            if (cube.column < NUMBER_OF_LINES - 3 &&
                cube.column > NUMBER_OF_LINES - 10 &&
                cube.row < NUMBER_OF_LINES - 3
                && cube.row > NUMBER_OF_LINES - 10) {
                isTouchHouse = true;
            }
            if (cube.column > 1 && cube.column < 7 &&
                cube.row > 1 && cube.row < 11 ||
                cube.column > 7 && cube.column < 11 &&
                cube.row > 1 && cube.row < 7) {
                isTouchHouse = true;
            }
        }

        return isTouchHouse;
    },

    isSnakeTouchWall: (WALLS, snakePosition) => {
        console.log(snakePosition);
        // for (const part of snakePosition) {
        //     if ((part.column === WALLS.right && part.direction === "left") ||
        //         (part.column === WALLS.left && part.direction === "right")) {
        //         if (part.row === WALLS.top || part.column === WALLS.bottom) {
        //             return true;
        //         }
        //     }
        // }
    },
};
