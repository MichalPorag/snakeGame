module.exports = {
    playSadSound: () => {
        // const sad = new Audio("https://www.fesliyanstudios.com/play-mp3/5645");
        // sad.play().catch(e => console.error(e));
    },

    playBurpSound: () => {
        window.setTimeout(function () {
        const burp = new Audio("https://www.fesliyanstudios.com/play-mp3/5759");
        burp.play().catch(e => console.error(e));
    }, 100);
    }
};