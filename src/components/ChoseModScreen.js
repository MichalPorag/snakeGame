import React from 'react';

function ChoseModScreen() {
    return (
        <div id={"game-over-screen"}
             className={"show"}>
            <section>
                <h3>Select a difficulty level:</h3>
                <ul>
                    <button id={`BTN-start-new-game`}>
                        Classic Snake
                    </button>
                    <button id={`BTN-start-new-game`}>
                        Classic Snake
                    </button>
                    <button id={`BTN-start-new-game`}>
                        Classic Snake
                    </button>
                </ul>
            </section>
            <section>
                <h3>Select a difficulty mod:</h3>
                <ul>
                    <button id={`BTN-start-new-game`}
                            className={"BTN-rect"}>
                        Classic Snake
                    </button>
                    <button id={`BTN-start-new-game`}
                            className={"BTN-rect"}>
                        Classic Snake
                    </button>
                    <button id={`BTN-start-new-game`}
                            className={"BTN-rect"}>
                    Classic Snake
                    </button>
                </ul>
            </section>
        </div>
    );
}

export default ChoseModScreen;