import React from 'react';

function SettingsButton({settingsButtonClicked}) {
    return (
        <button className={"BTN-settings"}
                onClick={settingsButtonClicked}/>
    );
}

export default SettingsButton;