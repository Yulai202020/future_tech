import IMask from 'imask';

rootSelector = '[data-js-input-mask]';

class InputMask {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.init();
    }

    init() {
        IMask(this.rootElement, {
            mask: this.rootElement.dataset.jsInputMask,
        });
    }
}

class InputMaskCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((i) => {
            new InputMask(i);
        });
    }
}

export default InputMaskCollection;
