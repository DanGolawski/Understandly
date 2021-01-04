class UploadComponent {

    body;
    inputElement;
    states = {
        start: true,
        uploading: false,
        loading: false,
        finish: false
    }
    appController;

    constructor(componentBody, subscriber) {
        this.body = componentBody;
        this.handleFileUpload();
        this.handleViewChange();
        this.appController = subscriber;
    }

    start() {
        this.body.style.visibility = 'visible';
    }

    handleFileUpload() {
        this.inputElement = this.body.querySelector('#fileInput');
        const self = this;
        this.inputElement.addEventListener('change', function () {
            self.handleViewChange();
            setTimeout(() => {
                var fr = new FileReader();
                fr.onload = function () {
                    self.notifyDataLoaded(fr.result)
                    // self.bertService.setTextToRead(fr.result);
                    // self.handleStateChange();
                    // self.getAnswer(self.fileText, 'what is the meaning of "Vorsprung durch Technik');

                }
                fr.readAsText(this.files[0]);
            }, 3000);

        })
    }

    handleViewChange() {
        this.switchStates();
        if (this.states.start) {
            this.body.style.visibility = 'visible';
        }
        if (this.states.uploading) {
            this.body.querySelector('#uploadIcon').style.visibility = 'visible';
            this.body.querySelector('#uploadLoadingIcon').style.visibility = 'hidden';
        } else if (this.states.loading) {
            this.body.querySelector('#uploadIcon').style.visibility = 'hidden';
            this.body.querySelector('#uploadLoadingIcon').style.visibility = 'visible';
        } else if (this.states.finish) {
            this.body.style.visibility = 'hidden';
        }
    }

    switchStates() {
        if (this.states.start) {
            this.states.start = false;
            this.states.uploading = true;
        } else if (this.states.uploading) {
            this.states.uploading = false;
            this.states.loading = true;
        } else if (this.states.loading) {
            this.states.loading = false;
            this.states.finish = true;
        } else if (this.states.finish) {
            this.states.finish = false;
            this.states.start = true;
        }
    }

    notifyDataLoaded(text) {
        console.log('NOTIFICATION')
        this.handleViewChange();
        this.appController.handleTextUpload(text);
    }

}