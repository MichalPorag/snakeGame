import React from 'react';

function GameOverScreen({handleClicked}) {
    return (
        <div id={"game-over-screen"}
             className={"show"}>
            <section>
                <h2>Ohh...</h2>
                <h1>You Failed!</h1>
            </section>
            <h3>Want to start over?</h3>
            <button className={`BTN-standard`}
                    onClick={handleClicked}>
                Start Again
            </button>
        </div>
    );
}

export default GameOverScreen;