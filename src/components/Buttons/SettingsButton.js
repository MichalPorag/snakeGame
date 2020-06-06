import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SettingsButton({settingsButtonClicked}) {
    return (
        // <button className={"BTN-settings"}
                // onClick={settingsButtonClicked}/>
        <button className={"BTN-settings"}>
            <FontAwesomeIcon icon={['fas', "cog"]} />
        </button>
    );
}

export default SettingsButton;
