const rootSelector = '[tabs]';

class Tabs {
    selectors = {
        root: rootSelector,
        button: '[tabs-button]',
        content: '[tabs-content]',
    };

    stateClasses = {
        isActive: 'is-active',
    };

    stateAttributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    };

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(
            this.selectors.button
        );
        this.contentElements = this.rootElement.querySelectorAll(
            this.selectors.content
        );

        this.state = this.getProxyState({
            activeTabIndex: [...this.buttonElements].findIndex((button) => {
                button.classList.contains(this.stateClasses.isActive);
            }),
        });

        this.limitTabsIndex = this.buttonElements.length - 1;
        this.bindEvents();
    }

    getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop];
            },

            set: (target, prop, value) => {
                target[prop] = value;

                this.updateUI();

                return true;
            },
        });
    }

    bindEvents() {
        this.buttonElements.forEach((button, index) => {
            button.addEventListener('click', () => this.onButtonClick(index));
        });

        this.rootElement.addEventListener('keydown', this.onKeyDown);
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex;
    }

    onKeyDown = (event) => {
        const { code, metaKey } = event;

        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
        }[code];

        const isMacHomeKey = metaKey && code === 'ArrowLeft';

        if (isMacHomeKey) {
            this.firstTab();
            return;
        }

        const isMacEndKey = metaKey && code === 'ArrowRight';

        if (isMacHomeKey) {
            this.lastTab();
            return;
        }

        action?.();
    };

    updateUI() {
        const { activeTabIndex } = this.state;

        this.buttonElements.forEach((button, index) => {
            const isActive = index === activeTabIndex;
            button.classList.toggle(this.stateClasses.isActive, isActive);
        });

        this.contentElements.forEach((content, index) => {
            const isActive = index === activeTabIndex;
            content.classList.toggle(this.stateClasses.isActive, isActive);
        });
    }

    activateTab(newTabIndex) {
        this.state.activeTabIndex = newTabIndex;
        this.buttonElements[newTabIndex].focus();
    }

    previousTab = () => {
        const newTabIndex =
            this.state.activeTabIndex === 0
                ? this.limitTabsIndex
                : this.state.activeTabIndex - 1;
        this.activateTab(newTabIndex);
    };

    nextTab = () => {
        const newTabIndex =
            this.state.activeTabIndex === this.limitTabsIndex
                ? 0
                : this.state.activeTabIndex + 1;
        this.activateTab(newTabIndex);
    };

    lastTab = () => {
        this.activateTab(this.limitTabsIndex);
    };

    nextTab = () => {
        this.activateTab(0);
    };
}

class TabsCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((i) => {
            new Tabs(i);
        });
    }
}

export default TabsCollection;
