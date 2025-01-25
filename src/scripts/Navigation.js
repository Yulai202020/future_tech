const rootSelector = '[header-link]';

class Navigation {
    constructor() {
        this.init();
    }

    init() {
        // this.allLinksElements = document.querySelectorAll(rootSelector);
        // this.allLinksElements.forEach((link) => {
        //     link.addEventListener('click', (e) => {
        //         e.preventDefault(); // Prevent the default link behavior
        //         // Handle navigation manually
        //         window.location.hostname = 'www.google.com';
        //         // Update active link class
        //         this.allLinksElements.forEach((k) => {
        //             k.classList.remove('is-active');
        //         });
        //         e.target.classList.add('is-active');
        //     });
        // });
    }
}

export default Navigation;
