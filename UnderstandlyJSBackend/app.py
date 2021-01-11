import flask
from flask import Flask, jsonify
import nltk.data
from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords
nltk.download('stopwords')
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin


def convert_sentence_to_lowercase(sentence):
    return sentence.lower()


def convert_to_lowercase_for_list(list):
    for idx, sentence in enumerate(list):
        list[idx] = convert_sentence_to_lowercase(sentence)
    return list


def remove_signs_from_sentence_and_split(sentence):
    tokenizer = RegexpTokenizer(r'\w+')
    return tokenizer.tokenize(sentence)


def remove_signs_and_split(list):
    for idx, sentence in enumerate(list):
        list[idx] = remove_signs_from_sentence_and_split(sentence)
    return list


def remove_stopwords_from_sentence(text_tokens):
    return [word for word in text_tokens if not word in stopwords.words()]


def remove_stopwords(list):
    for idx, text_tokens in enumerate(list):
        list[idx] = remove_stopwords_from_sentence(text_tokens)
    return list


def stemming_for_sentence(words):
    stemmer = PorterStemmer()
    return [stemmer.stem(word) for word in words]


def stemming(list):
    for idx, words in enumerate(list):
        list[idx] = stemming_for_sentence(words)
    return list


def match(query, sentences):
    results = {}
    for idx, sentence in enumerate(sentences):
        # print(sentence)
        # print(query)
        # print('\n')
        counter = 0.0
        for word in query:
            if word in sentence:
                counter += 1.0
        results[idx] = counter / len(query)
    return results


def get_answer(question, data):
    tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
    # fp = open("resources/article1.txt")
    # data = fp.read()
    sentences = tokenizer.tokenize(data)
    data = sentences.copy()

    # 1. Convert text to lowercase
    data = convert_to_lowercase_for_list(data)

    # 2. Remove punctuations
    data = remove_signs_and_split(data)

    # 3. Remove stopwords
    data = remove_stopwords(data)

    # 4. Stemming
    data = stemming(data)

    query = question

    query = convert_sentence_to_lowercase(query)
    query = remove_signs_from_sentence_and_split(query)
    query = remove_stopwords_from_sentence(query)
    query = stemming_for_sentence(query)

    results = match(query, data)
    sentence_idx = max(results, key=results.get)

    return sentences[sentence_idx]


app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/findanswer', methods=['POST'])
@cross_origin()
def handle_question():
    content = request.get_json()
    answers = get_answer(content['question'], content['text'])
    return jsonify(answers)


if __name__ == '__main__':
    app.run()



