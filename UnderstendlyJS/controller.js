class Controller {

    appContainer;
    otherComponentsManager;
    uploadComponent;
    questionComponent;
    bertService;
    textToProcess;


    constructor(appContainer) {
        this.appContainer = appContainer;
        this.initializeComponents();
    }

    initializeComponents() {
        this.otherComponentsManager = new OtherComponentsManager(this);
        this.uploadComponent = new UploadComponent(document.querySelector('#uploadComponent'), this);
        this.questionComponent = new QuestionComponent('#questionComponent', this);
        this.bertService = new BertService();
    }

    // called by OtherComponentsManager
    enableUploading() {
        this.uploadComponent.start();
    }

    // called by UploadComponent
    handleTextUpload(text) {
        this.textToProcess = text;
        this.questionComponent.start();
    }

    // called by QuestionComponent
    handleQuestion(question) {
        const answersPromise = this.bertService.getAnswers(question, this.textToProcess);
        answersPromise.then(answers => {
            console.log(answers)
            if (answers.length > 0) {
                this.showAnswer(answers[0].text);

            } else {
                this.findAlternativeAnswer(question);
            }
        });
    }

    findAlternativeAnswer(question) {
        this.bertService.getAlternativeAnswer(question, this.textToProcess).then(answer => {
            this.showAnswer(answer)
        });
    }

    showAnswer(answer) {
        this.questionComponent.showAnswer(answer);
        this.otherComponentsManager.showRetryButton();
    }

    // called by OtherComponentsManager
    retry() {
        this.questionComponent.start();
    }
}