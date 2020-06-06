import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function SoundButton({isSoundActive, soundButtonClicked}) {
    return (
        <button className={`BTN-audio`}
                onClick={soundButtonClicked}>
            {isSoundActive ?
                <FontAwesomeIcon icon={['fas', "volume-up"]} /> :
                <FontAwesomeIcon icon={['fas', "volume-mute"]} />
            }
        </button>
    );
}

export default SoundButton;
