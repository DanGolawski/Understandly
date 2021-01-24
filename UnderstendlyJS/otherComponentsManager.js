class OtherComponentsManager {

    appController;
    startButton;
    manualButton;
    aboutButton;
    contactButton;
    retryButton;

    constructor(controller) {
        this.appController = controller;
        this.startButton = document.querySelector('#startButton');
        this.manualButton = document.querySelector('#manualComponent');
        this.aboutButton = document.querySelector('#aboutAppComponent');
        this.contactButton = document.querySelector('#contactComponent');
        this.retryButton = document.querySelector('#retryComponent');
        this.manageButtons();
        this.manageSatelites();
        window.addEventListener('resize', () => this.manageSatelites());

    }

    manageButtons() {
        this.startButton.style.visibility = 'visible';
        this.startButton.addEventListener('click', () => {
            this.appController.enableUploading();
            this.hideButtons();
        });
        this.retryButton.addEventListener('click', () => {
            this.retryButton.style.visibility = 'hidden';
            this.hideButtons();
            this.appController.retry();
        });
    }

    showRetryButton() {
        this.retryButton.style.visibility = 'visible';
        this.retryButton.style.opacity = 1;
    }

    hideButtons() {
        this.startButton.style.opacity = 0;
        this.manualButton.style.opacity = 0;
        this.aboutButton.style.opacity = 0;
        this.contactButton.style.opacity = 0;
        this.retryButton.style.opacity = 0;
        setTimeout(() => {
            this.startButton.style.visibility = 'hidden';
            this.manualButton.style.visibility = 'hidden';
            this.aboutButton.style.visibility = 'hidden';
            this.contactButton.style.visibility = 'hidden';
            this.retryButton.style.visibility = 'hidden';
        }, 1000);
    }

    manageSatelites() {
        const satelites = document.querySelectorAll('.satelite');
        const startButton = document.querySelector('#startButton');
        satelites.forEach((satelite, satIdx) => {
            const coords = this.getSateliteCoords(startButton, satelite, satIdx);
            satelite.style.marginLeft = `${coords.x}px`;
            satelite.style.top = `${coords.y}px`;
        });
    }

    getSateliteCoords(reference, satelite, satIdx) {
        const coords = {};
        const refCoords = reference.getBoundingClientRect();
        coords.x = satIdx % 2 === 0 ? (refCoords.left - satelite.offsetWidth - 10) : (refCoords.right + 10);
        coords.y = Math.random() * satelite.offsetHeight + satIdx * satelite.offsetHeight;
        return coords;
    }

}