import React from 'react';
import './scss/app.scss';

import logic from "../../utils/utilsFunctions";
import validation from "../../utils/validation";

function Apple() {
    const paintApple = () => {
        let cubeToChange = logic.findCurrentCube(applePositions, board);
        if (cubeToChange) {
            cubeToChange.classList.add("apple");
        }
    };

    const cleanApple = () => {
        let cubeToRest = logic.findCurrentCube(applePositions, board);
        cubeToRest.classList = "cube";
    };

    /**Get in to recursion until the cube the is valid*/
    const updateApplePosition = () => {
        let newRandomCube = logic.getRandomCube(1, NUMBER_OF_LINES - 2);
        if (validation.isApplePositionValid(newRandomCube, snakePositions, applePositions)) {
            setApplePositions(newRandomCube);
        } else {
            updateApplePosition();
        }
    };
}

export default Apple;