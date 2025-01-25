class Header {
    selectors = {
        root: '[header]',
        overlay: '[header-overlay]',
        burgerButton: '[header-burger-button]',
    };

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    };

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        this.overlayElement = document.querySelector(this.selectors.overlay);
        this.burgerButtonElement = document.querySelector(
            this.selectors.burgerButton
        );

        this.bindEvents();
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', () => {
            this.burgerButtonElement.classList.toggle(
                this.stateClasses.isActive
            );

            this.overlayElement.classList.toggle(this.stateClasses.isActive);

            document.documentElement.classList.toggle(this.stateClasses.isLock);
        });
    }
}

export default Header;
