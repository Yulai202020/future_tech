import BaseComponent from './BaseComponent';
import MatchMedia from './MatchMedia';

const rootSelector = '[select]';

class Select extends BaseComponent {
    selectors = {
        root: rootSelector,
        originalControl: '[select-original-control]',
        button: '[select-button]',
        dropdown: '[select-dropdown]',
        option: '[select-option]',
    };

    stateClasses = {
        isExpanded: 'is-expanded',
        isSelected: 'is-selected',
        isCurrent: 'is-current',
        isOnTheLeftSide: 'is-on-the-left-side',
        isOnTheRightSide: 'is-on-the-right-side',
    };

    stateAttributes = {
        ariaExpanded: 'aria-expanded',
        ariaSelected: 'aria-selected',
        ariaActiveDescendant: 'aria-activedescendant',
    };

    initialState = {
        isExpanded: false,
        currentOptionIndex: null,
        selectedOptionElement: null,
    };

    constructor(rootElement) {
        super();

        this.rootElement = rootElement;
        this.originalControlElement = this.rootElement.querySelector(
            this.selectors.originalControl
        );

        this.buttonElement = this.rootElement.querySelector(
            this.selectors.button
        );

        this.dropdownElement = this.rootElement.querySelector(
            this.selectors.dropdown
        );

        this.optionElements = this.dropdownElement.querySelectorAll(
            this.selectors.option
        );

        this.state = this.getProxyState({
            ...this.initialState,
            currentOptionIndex: this.originalControlElement.selectedIndex,
            selectedOptionIndex:
                this.optionElements[this.originalControlElement.selectedIndex],
        });

        this.state.selectedOptionElement = [...this.optionElements].find(
            (optionElement) =>
                optionElement.classList.contains(this.stateClasses.isSelected)
        );

        this.fixDropdownPosition();
        this.updateTabIndexes();
        this.bindEvents();
    }

    updateUI() {
        const { isExpanded, currentOptionIndex, selectedOptionElement } =
            this.state;

        const newSelectedOptionValue =
            selectedOptionElement?.textContent.trim();

        const updateOriginalControl = () => {
            this.originalControlElement.value = newSelectedOptionValue;
        };

        const updateButon = () => {
            this.buttonElement.textContent = newSelectedOptionValue;
            this.buttonElement.classList.toggle(
                this.stateClasses.isExpanded,
                isExpanded
            );

            this.buttonElement.setAttribute(
                this.stateAttributes.ariaExpanded,
                isExpanded
            );

            this.buttonElement.setAttribute(
                this.stateAttributes.ariaActiveDescendant,
                this.optionElements[currentOptionIndex].id
            );
        };

        const updateDropdown = () => {
            this.dropdownElement.classList.toggle(
                this.stateClasses.isExpanded,
                isExpanded
            );
        };

        const updateOption = () => {
            this.optionElements.forEach((optionElement, id) => {
                const isCurrent = currentOptionIndex === id;
                const isSelected = selectedOptionElement === optionElement;

                optionElement.classList.toggle(
                    this.stateClasses.isCurrent,
                    isCurrent
                );

                optionElement.classList.toggle(
                    this.stateClasses.isSelected,
                    isSelected
                );

                optionElement.setAttribute(
                    this.stateAttributes.ariaSelected,
                    isSelected
                );
            });
        };

        updateOriginalControl();
        updateButon();
        updateDropdown();
        updateOption();
    }

    fixDropdownPosition() {
        const viewportWidth = document.documentElement.clientWidth;
        const halfViewportX = viewportWidth / 2;

        const { width, x } = this.buttonElement.getBoundingClientRect();

        const buttonCenterX = x + width / 2;
        const isButtonOnTheLeftSide = buttonCenterX < halfViewportX;

        this.dropdownElement.classList.toggle(
            this.stateClasses.isOnTheLeftSide,
            isButtonOnTheLeftSide
        );

        this.dropdownElement.classList.toggle(
            this.stateClasses.isOnTheRightSide,
            !isButtonOnTheLeftSide
        );
    }

    updateTabIndexes(mediaInfo = MatchMedia.mobile.matches) {
        this.originalControlElement.tabIndex = mediaInfo ? 0 : -1;
        this.buttonElement.tabIndex = mediaInfo ? -1 : 0;
    }

    bindEvents() {
        MatchMedia.mobile.addEventListener(
            'change',
            this.onMobileMatchMediaChange
        );

        this.buttonElement.addEventListener('click', this.onButtonClick);
        document.addEventListener('click', this.onClick);

        // this.rootElement
    }

    onMobileMatchMediaChange = (event) => {
        this.updateTabIndexes(event.matches);
    };

    onButtonClick = (event) => {
        this.toggleExpandedState();
    };

    toggleExpandedState() {
        this.state.isExpanded = !this.state.isExpanded;
    }

    expand() {
        this.state.isExpanded = true;
    }

    collapse() {
        this.state.isExpanded = false;
    }

    onClick = (event) => {
        const { target } = event;

        const isOutsideDropdownClick =
            target.closest(this.selectors.dropdown) !== this.dropdownElement;

        const isButtonClick = target === this.buttonElement;

        if (isOutsideDropdownClick && !isButtonClick) {
            this.collapse();
            return;
        }

        const isOptionClick = target.matches(this.selectors.option);

        if (isOptionClick) {
            this.state.selectedOptionElement = target;
            this.state.currentOptionIndex = [...this.optionElements].findIndex(
                (optionElement) => optionElement === target
            );

            this.collapse();
        }
    };
}

class SelectCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((i) => {
            new Select(i);
        });
    }
}

export default SelectCollection;
