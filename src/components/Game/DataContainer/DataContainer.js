import React from 'react';

import SoundButton from "./SoundButton";
import Counter from "./Counter";
import SettingsButton from "./SettingsButton";

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