import React from 'react';
import StartButton from "../Buttons/StartButton";

function Settings({changeLevel, changeMode, startAgainClicked, goBackClicked}) {
    return (
        <div className={"layout-screen show"}>
            <button className={"BTN-back"}
                    onClick={goBackClicked}/>
            <h3>Settings</h3>
            <section>
                <h5>Chose Level</h5>
                <ul>
                    <button className={"BTN-pick-setting"}
                            onClick={changeLevel}>
                        Beginner
                    </button>
                    <button className={"BTN-pick-setting"}
                            onClick={changeLevel}>
                        Averages
                    </button>
                    <button className={"BTN-pick-setting"}
                            onClick={changeLevel}>
                        Advanced
                    </button>
                </ul>
            </section>
            <section>
                <h5>Chose Mode</h5>
                <ul>
                    <button className={"BTN-pick-setting"}
                            onClick={changeMode}>
                        Classic
                    </button>
                    <button className={"BTN-pick-setting"}
                            onClick={changeMode}>
                        Portal Snake
                    </button>
                    <button className={"BTN-pick-setting"}
                            onClick={changeMode}>
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
