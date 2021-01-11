class QuestionComponent {

    states = {
        question: true,
        answer: false
    }

    componentBody;
    appController;

    constructor(selector, controller) {
        this.appController = controller;
        this.componentBody = document.querySelector(selector);
    }

    start() {
        this.componentBody.style.visibility = 'visible';
        this.handleAsking();
    }

    handleAsking() {
        this.componentBody.querySelector('#questionField').style.visibility = 'visible';
        this.componentBody.querySelector('#answerField').style.visibility = 'hidden';
        this.componentBody.querySelector('#questionLoadingIcon').style.visibility = 'hidden';

        const inputField = this.componentBody.querySelector('#questionField');
        const self = this;
        inputField.addEventListener("keyup", key => {
            if (key.code === 'Enter') {
                const text = inputField.value;
                if (!text) {
                    alert('Please, write a question!')
                    return;
                }
                self.componentBody.querySelector('#questionLoadingIcon').style.visibility = 'visible';
                self.notifyUserAsked(text);
                inputField.value = '';
            }

        });
    }

    notifyUserAsked(text) {
        this.appController.handleQuestion(text);
    }

    showAnswer(answer) {
        this.componentBody.querySelector('#questionField').style.visibility = 'hidden';
        this.componentBody.querySelector('#questionLoadingIcon').style.visibility = 'hidden';
        const answerField = this.componentBody.querySelector('#answerField');
        answerField.style.visibility = 'visible';
        answerField.innerHTML = answer;
    }

}