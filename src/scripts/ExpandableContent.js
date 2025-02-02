const rootSelector = '[expandable-content]';

class ExpandableContent {
    selectors = {
        root: rootSelector,
        button: '[expandable-content-button]',
    };

    stateClasses = {
        isExpanded: 'is-expanded',
    };

    animationParams = {
        duration: 500,
        easing: 'ease',
    };

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonElement = this.rootElement.querySelector(
            this.selectors.button
        );

        this.bindEvents();
    }

    bindEvents() {
        this.buttonElement.addEventListener('click', this.onButtonClick);
    }

    onButtonClick = () => {
        this.expand();
    };

    expand() {
        const { offsetHeight, scrollHeight } = this.rootElement;
        this.rootElement.classList.add(this.stateClasses.isExpanded);
        this.rootElement.animate(
            [
                {
                    maxHeight: `${offsetHeight}px`,
                },
                {
                    maxHeight: `${scrollHeight}px`,
                },
            ],
            this.animationParams
        );
    }
}

class ExpandableContentCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((i) => {
            new ExpandableContent(i);
        });
    }
}

export default ExpandableContentCollection;
