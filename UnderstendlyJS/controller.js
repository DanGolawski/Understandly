class Controller {

    appContainer;
    otherComponentsManager;
    uploadComponent;
    questionComponent;
    bertService;
    textToProcess;
    historyManager;

    constructor(appContainer) {
        this.appContainer = appContainer;
        this.initializeComponents();
    }

    initializeComponents() {
        this.otherComponentsManager = new OtherComponentsManager(this);
        this.uploadComponent = new UploadComponent(document.querySelector('#uploadComponent'), this);
        this.questionComponent = new QuestionComponent('#questionComponent', this);
        this.bertService = new BertService();
        this.historyManager = new HistoryManager();
    }

    // called by OtherComponentsManager
    enableUploading() {
        this.uploadComponent.start();
    }

    // called by UploadComponent
    handleTextUpload(text) {
        this.moveElementsToTheRight();
        this.otherComponentsManager.showText(text);
        this.textToProcess = text;
        this.questionComponent.start();
    }

    // called by QuestionComponent
    handleQuestion(question) {
        const answersPromise = this.bertService.getAnswers(question, this.textToProcess);
        answersPromise.then(answers => {
            console.log(answers)
            if (answers.length > 0) {
                this.showAnswer(question, answers[0].text);

            } else {
                this.findAlternativeAnswer(question);
            }
        }).catch(error => alert(`An error occured. Please try again. Error message : ${error}`));
    }

    findAlternativeAnswer(question) {
        this.bertService.getAlternativeAnswer(question, this.textToProcess).then(answer => {
            this.showAnswer(question, answer);
            alert('There is no certainty this is correct answer')
        }).catch(error => alert(`An error occured. Please try again. Error message : ${error}`));
    }

    showAnswer(question, answer) {
        this.historyManager.saveResult(question, answer);
        this.otherComponentsManager.highlightText(answer);
        this.questionComponent.showAnswer(answer);
        this.otherComponentsManager.showRetryButton();
    }

    // called by OtherComponentsManager
    retry() {
        this.otherComponentsManager.resetText();
        this.questionComponent.start();
    }

    moveElementsToTheRight() {
        document.querySelectorAll('.circleComponent').forEach(component => {
            component.classList.add('circleRight');
        });
    }
}