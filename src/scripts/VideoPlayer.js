const rootSelector = '[video-player]';

class VideoPlayer {
    selectors = {
        root: rootSelector,
        video: '[video-player-video]',
        panel: '[video-player-panel]',
        playButton: '[video-player-play-button]',
    };

    stateClasses = {
        isActive: 'is-active',
    };

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.videoElement = this.rootElement.querySelector(
            this.selectors.video
        );

        this.panelElement = this.rootElement.querySelector(
            this.selectors.panel
        );

        this.playButtonElement = this.rootElement.querySelector(
            this.selectors.playButton
        );

        this.bindEvents();
    }

    bindEvents() {
        this.playButtonElement.addEventListener(
            'click',
            this.onPlayButtonClick
        );

        this.videoElement.addEventListener('pause', this.onVideoPause);
    }

    onPlayButtonClick = () => {
        this.videoElement.play();
        this.videoElement.controls = true;
        this.panelElement.classList.remove(this.stateClasses.isActive);
    };

    onVideoPause = () => {
        this.videoElement.controls = false;
        this.panelElement.classList.add(this.stateClasses.isActive);
    };
}

class VideoPlayerCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((i) => {
            new VideoPlayer(i);
        });
    }
}

export default VideoPlayerCollection;
