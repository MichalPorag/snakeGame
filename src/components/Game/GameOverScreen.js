import React from 'react';

function GameOverScreen({startAgainClicked}) {
    return (
        <div className={"layout-screen "}>
            <section>
                <h2>Ohh...</h2>
                <h1>You Failed!</h1>
            </section>
            <h3>Want to start over?</h3>
            <button className={`BTN-standard`}
                    onClick={startAgainClicked}>
                Start Again
            </button>
        </div>
    );
}

export default GameOverScreen;