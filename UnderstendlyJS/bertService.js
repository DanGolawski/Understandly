class BertService {

    constructor() {

    }

    getAnswers(question, passage) {
        const answersPromise = new Promise((resolve, reject) => {
            qna.load().then(model => {
                model.findAnswers(question, passage).then(answers => {
                    resolve(answers);
                },
                    error => {
                        console.log(error);
                        reject(error)
                    });
            });
        });
        return answersPromise;
    }

    async getAlternativeAnswer(question, passage) {
        const answerPromise = new Promise((resolve, reject) => {
            $.ajax({
                contentType: "application/json; charset=utf-8",
                processData: false,
                type: 'POST',
                url: 'http://127.0.0.1:5000/findanswer',
                dataType: 'json',
                data: JSON.stringify({
                    'question': question,
                    'text': passage
                }),
                success: function (data) {
                    resolve(data);
                },
                error: function () {
                    reject("Device control failed");
                }
            });
        });
        return answerPromise;
    }
}