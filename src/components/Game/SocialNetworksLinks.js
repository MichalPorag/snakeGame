import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SocialNetworksLinks() {
    const socialNetworks = {
        "github": "https://github.com/MichalPorag/snakeGame",
        "facebook": "https://www.facebook.com/miporagi/",
        "twitter": "https://twitter.com/MichalPorag",
        "linkedin": "https://www.linkedin.com/in/michal-porag-9522b5142/",
        "medium": "https://medium.com/@miporagi",
        "youtube": "https://www.youtube.com/playlist?list=PLH7Km7lJwMqSviBIID2XUT2BBE_ZTpDWy",
        "codepen": "https://codepen.io/michalporag"
    };

    return (
        <ul className={"socialNetworks"}>
            {Object.entries(socialNetworks).map(network =>
                <li className={"icon"}
                    key={network[0]}
                    onClick={()=> window.open(`${network[1]}`, "_blank")}>
                    <FontAwesomeIcon icon={['fab', `${network[0]}`]} />
                </li>
                )}
        </ul>
    );
}

export default SocialNetworksLinks;
