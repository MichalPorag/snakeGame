module.exports = {
    isEqualToApplePosition: (cube, applePositions) => {
        return cube === applePositions;
    },

    isEqualToFrameOfBoard: (cube, snakeDirection, NUMBER_OF_LINES) => {
        let isSnakeHeadTouchFrame = false;
        switch (snakeDirection) {
            case "left":
                isSnakeHeadTouchFrame = (cube % 100) === 0;
                break;
            case "right":
                isSnakeHeadTouchFrame = (cube % 100) === (NUMBER_OF_LINES - 1);
                break;
            case "down":
                isSnakeHeadTouchFrame = Math.floor(cube / 100) === (NUMBER_OF_LINES - 1);
                break;
            case "up":
                isSnakeHeadTouchFrame = Math.floor(cube / 100) === 0;
                break;
            default:
                break;
        }
        return isSnakeHeadTouchFrame;
    },

    isEqualToSnakeHeadPosition: (cube, snakePositions) => {
        return snakePositions.includes(cube);
    },

    /**
     * Snake position is valid if it is not in the same cube as
     * the snake, apple or tree.
     */
    isSnakeHeadPositionValid: (snakeHead, snakeDirection, snakePositions, NUMBER_OF_LINES) => {
        return !(module.exports.isEqualToFrameOfBoard(snakeHead, snakeDirection, snakePositions, NUMBER_OF_LINES) ||
            module.exports.isEqualToSnakeHeadPosition(snakeHead, snakePositions))
    },

    /**
     * Apple position is valid if it is not in the same cube as
     * the snake, apple or tree.
     */
    isApplePositionValid: (applePositionToCheck, snakePositions, applePositions) => {
        return !(module.exports.isEqualToSnakeHeadPosition(applePositionToCheck, snakePositions) &&
            module.exports.isEqualToApplePosition(applePositionToCheck, applePositions))
    },
};