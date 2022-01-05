function getPlayerElement() {
    // first search by id
    const moviePlayer = document.getElementById("movie_player");
    if (moviePlayer && moviePlayer.hideControls) {
        return moviePlayer;
    }

    // search by class
    const videoPlayers = document.getElementsByClassName("html5-video-player");
    for (let player of videoPlayers) {
        if (player.hideControls) {
            return player;
        }
    }

    // then search by tag name
    const videoElement = document.getElementsByTagName("video");
    for (let player of videoElement) {
        if (player.offsetParent != null ) {
            return player.parentElement.parentElement;
        }
    }

    return null;
}

function hideControls() {
    const player = getPlayerElement();

    player?.hideControls();
}

function showControls() {
    const player = getPlayerElement();

    player?.showControls();
}

function showCursor() {
    const player = getPlayerElement();

    player?.style.cursor = "";
}

function hideCursor() {
    const player = getPlayerElement();

    player?.style.cursor = "none";
}

window.addEventListener("message", function(event) {
    if (event.source != window
        || !event.data.source && event.data.source != "YOUTUBE_HIDE_CONTROL"
        || !event.data.action) {
        return;
    }

    if (event.data.action == "SHOW_PLAYER") {
        showControls();
        showCursor();
    }
    else if (event.data.action == "HIDE_PLAYER") {
        hideControls();

        if (!event.data.hideCursor){
            hideCursor();
        }
    }
}, false);
