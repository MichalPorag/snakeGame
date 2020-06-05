import React from 'react';

function GameOverScreen({startAgainClicked, isFirstGame}) {
     const firstGame = () => {
         return (
                 <>
                     <h1>Want to start a game?</h1>
                     <button className={`BTN-standard`}
                             onClick={startAgainClicked}>
                         Start Again
                     </button>
                 </>
             )
     };

    const newGame = () => {
        return (
            <>
                <section>
                    <h2>Ohh...</h2>
                    <h1>You Failed!</h1>
                </section>
                        <h3>Want to start over</h3>
                <button className={`BTN-standard`}
                        onClick={startAgainClicked}>
                    Start Again
                </button>
            </>
        )
    };

    return (
        <div className={"layout-screen "}>
            {
                isFirstGame ? firstGame() : newGame()
            }
        </div>
    );
}

export default GameOverScreen;
