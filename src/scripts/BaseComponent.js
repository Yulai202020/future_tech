class BaseComponent {
    constructor() {
        if (this.constructor === BaseComponent) {
            throw new Error('cant create abstarct class!');
        }
    }

    getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop];
            },

            set: (target, prop, newValue) => {
                const oldValue = target[prop];

                target[prop] = newValue;

                if (newValue !== oldValue) {
                    this.updateUI();
                }

                return true;
            },
        });
    }

    updateUI() {
        throw new Error('Please make function updateUI!');
    }
}

export default BaseComponent;
