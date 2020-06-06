import React from "react";

function StartButton({isGameOver, startAgainClicked}) {

    return (
        <button className={`BTN-standard ${isGameOver ? "" : "hide"}`}
                onClick={startAgainClicked}>
            Start Again
        </button>
    );
}

export default StartButton;
