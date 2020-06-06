import React from 'react';
import StartButton from "../Buttons/StartButton";

function Settings({level, mode, startAgainClicked, goBackClicked, isGameOver}) {
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
                    onClick={goBackClicked}/>
            <h3>Settings</h3>
            <section>
                <h5>Chose Level</h5>
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
                <h5>Chose Mode</h5>
                <ul>
                    <button className={"BTN-pick-setting"}
                            onClick={() => updateSettings("classic")}>
                        Classic
                    </button>
                    <button className={"BTN-pick-setting"}
                            onClick={() => updateSettings("portal")}>
                        Portal Snake
                    </button>
                    <button className={"BTN-pick-setting"}
                            onClick={() => updateSettings("village")}>
                        Snake In The Village
                    </button>
                </ul>
            </section>
            <StartButton isGameOver={true}
                         startAgainClicked={startAgainClicked}/>
        </div>
    );
}

export default Settings;
