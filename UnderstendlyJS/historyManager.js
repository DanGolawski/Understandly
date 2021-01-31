class HistoryManager {

    historyButton;
    historyContainer;
    nextButton;
    savedResults = []

    constructor() {
        this.historyButton = document.querySelector('#historyComponent');
        this.historyContainer = document.querySelector('#historyContainer');
        this.nextButton = document.querySelector('#nextButton');

        this.nextButton.addEventListener('click', () => this.changeContent());
    }

    saveResult(question, answer) {
        for (const result of this.savedResults)
            if (result.question === question)
                return;
        this.savedResults.push({ question: question, answer: answer, qaId: this.savedResults.length });
        this.setView();
    }

    setView() {
        if (this.savedResults.length > 1) {
            return;
        } else {
            this.nextButton.style.visibility = 'visible'
        }
        this.historyContainer.insertAdjacentHTML('beforeend', `<p class="question" qaId=${this.savedResults[0].qaId}>${this.savedResults[0].question}</p>`);
        this.historyContainer.insertAdjacentHTML('beforeend', `<p class="answer">${this.savedResults[0].answer}</p>`);
    }

    changeContent() {
        const currElems = this.historyContainer.querySelectorAll('p');
        const id = currElems[0].getAttribute('qaId');
        const nextIdx = (Number(id) + 1) % this.savedResults.length;
        currElems[0].setAttribute("qaId", nextIdx);
        currElems[0].innerHTML = this.savedResults[nextIdx].question;
        currElems[1].innerHTML = this.savedResults[nextIdx].answer;
        console.log()
    }
}