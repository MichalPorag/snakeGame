import React from 'react';

function SoundButton({isSoundActive, soundButtonClicked}) {
    return (
        <button className={`BTN-audio ${isSoundActive ? "unMute" : "mute"}`}
                onClick={soundButtonClicked}/>
    );
}

export default SoundButton;