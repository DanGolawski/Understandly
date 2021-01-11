class BertService {

    constructor() {

    }

    getAnswers(question, passage) {
        const answersPromise = new Promise((resolve, reject) => {
            qna.load().then(model => {
                model.findAnswers(question, passage).then(answers => {
                    resolve(answers);
                }).catch(error => {
                    reject(`1, ${error}`);
                });
            }).catch(error => {
                reject(`2, ${error}`);
            });
        });
        return answersPromise;
    }

    getAlternativeAnswer(question, passage) {
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
                    reject(new Error("An error occured. Please refresh the page or try later"));
                }
            }).catch(error => reject(error));
        });
        return answerPromise;
    }
}