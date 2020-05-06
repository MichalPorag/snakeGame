import React, {useState, useEffect, useRef} from 'react';
import './scss/app.scss';

import Snake from "./Snake";
import Apple from "./Apple";
import logic from "../../utils/utilsFunctions";

function Game({board, NUMBER_OF_LINES}) {
    let setCubes = () => {
        return [...Array(NUMBER_OF_LINES).keys()].map(i => (i === 0 || i === (NUMBER_OF_LINES - 1)) ?
            <div className={"frame-top-bottom"}
                 key={i}/> :
            <div className={`row i-${i}`} key={i * 100}>
                {[...Array(NUMBER_OF_LINES).keys()].map(j =>
                    (j === 0 || j === (NUMBER_OF_LINES - 1)) ?
                        <div className={`frame-sides i-${i} j-${j}`}
                             key={(i * 100) + j}/> :
                        <div className={"cube"}
                             key={(i * 100) + j}/>
                )}
            </div>
        );
    };

    /*Functions that change style*/
    const resetCubeStyle = (cube) => {
        logic.findCurrentCube(cube, board).classList = "cube";
    };

    /*CleanUp functions*/
    const cleanBoard = () => {
        cleanApple();
        cleanSnake();
        // cleanApple();
        // cleanTrees();
        // cleanHouses();
        // cleanWalls();
    };

    return (
        <main ref={board}>
            {setCubes()}
        </main>
    );
}

export default Game;