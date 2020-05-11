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
            if (cube.row !== snakePart.row || cube.column !== snakePart.column) {
                return false;
            }
        }
        return true;
    },

    /**
     * Snake position is valid if it is not in the same cube as
     * the snake, apple or tree.
     */
    isSnakeHeadPositionValid: (snakeHead, snakeDirection, snakePositions, NUMBER_OF_LINES) => {
        return !(
            module.exports.isEqualToFrameOfBoard(snakeHead,
                                                      snakeDirection,
                                                      snakePositions,
                                                      NUMBER_OF_LINES)
            ||
            module.exports.isEqualToSnakeHeadPosition(snakeHead, snakePositions)
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
};