import React from 'react';

import SoundButton from "../../Buttons/SoundButton";
import Counter from "./Counter";
import SettingsButton from "../../Buttons/SettingsButton";

function DataContainer({isSoundActive, soundButtonClicked, settingsButtonClicked, score}) {
    return (
        <div id={"data-container"}>
            <SoundButton
                isSoundActive={isSoundActive}
                soundButtonClicked={soundButtonClicked} />
            <Counter score={score}/>
            <SettingsButton
                settingsButtonClicked={settingsButtonClicked}/>
        </div>
    );
}

export default DataContainer;
