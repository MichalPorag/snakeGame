import React from 'react';

function Settings({level, mode, startGameClicked, goBack}) {
    let gameSettings = {
        level: level,
        mode: mode
    };

    const updateSettings = (valueToChange) => {
        if (valueToChange === "beginner" ||
            valueToChange === "averages" ||
            valueToChange === "advanced") {
            gameSettings.level = valueToChange;
        } else {
            gameSettings.mode = valueToChange;
        }

    };

    return (
        <div className={"layout-screen show"}>
            <button className={"BTN-back"}
                    onClick={goBack}/>
            <h2>Settings</h2>
            <section>
                <h3>Chose Level</h3>
                <ul>
                    <button className={"BTN-pick-setting"}
                            onClick={() => updateSettings("beginner")}>
                        Beginner
                    </button>
                    <button className={"BTN-pick-setting"}
                            onClick={() => updateSettings("averages")}>
                        Averages
                    </button>
                    <button className={"BTN-pick-setting"}
                            onClick={() => updateSettings("advanced")}>
                        Advanced
                    </button>
                </ul>
            </section>
            <section>
                <h3>Chose Mode</h3>
                <ul>
                    <button className={"BTN-pick-setting"}
                            onClick={() => updateSettings("classic")}>
                        Classic
                    </button>
                    <button className={"BTN-pick-setting disable"}
                            onClick={() => updateSettings("portal")}>
                        Portal Snake
                    </button>
                    <button className={"BTN-pick-setting disable"}
                            onClick={() => updateSettings("village")}>
                        Snake In The Village
                    </button>
                </ul>
            </section>
            <button className={"BTN-standard"}
                    onClick={() => startGameClicked(gameSettings)}>
                Start Game
            </button>
        </div>
    );
}

export default Settings;