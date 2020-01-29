import React from 'react';
import App from '../App';
import { Data, Uris, Local } from '../common/Data';
import { myUrl, playMp3 } from '../common/helpers';
import './LearnWords.css';
import Answer from './Answer';
import Quiz from './Quiz';


const setCount = 9;


class LearnWords extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            words: [
                { id: 0, en: '-----', bg: '-----', level: '--' }
            ],
            currentWord: 0,
            value: '',
            answer: 0,
            offset: 0,
        };
    }


    handleChange = (event, word) => {
        const value = event.currentTarget.value.trim().toLowerCase();

        if (value === word.en.trim().toLowerCase()) {
            this.handleIKnow(word);
        } else {
            this.setState({
                value: event.currentTarget.value
            });
        }

    };


    handleIKnow = (word) => {
        let { currentWord } = this.state;
        let learningEnglish = Local.getData();


        playMp3(word.en);

        learningEnglish.words.dontKnow = learningEnglish.words.dontKnow.filter(item => item.id !== word.id);

        currentWord++;

        if (currentWord === setCount) {

            if (learningEnglish.words.offset) {
                learningEnglish.words.offset = learningEnglish.words.offset + setCount - learningEnglish.words.dontKnow.length;
            } else {
                learningEnglish.words.offset = setCount;
            }


            this.getWords(learningEnglish)
                .then(function (response) {

                    let data = response.concat(learningEnglish.words.dontKnow)

                    this.setState({
                        words: data,
                        currentWord: 0,
                        value: '',
                        offset: learningEnglish.words.offset
                    });

                    learningEnglish.words.dontKnow = data;
                    Local.setData(learningEnglish);

                }.bind(this));

        } else {
            this.setState({
                currentWord: currentWord,
                value: ''
            });

            Local.setData(learningEnglish);
        }

    };


    handleNext = () => {
        let { currentWord } = this.state;
        let learningEnglish = Local.getData();

        currentWord++;

        if (currentWord === setCount) {

            if (learningEnglish.words.offset) {
                learningEnglish.words.offset = learningEnglish.words.offset + setCount - learningEnglish.words.dontKnow.length;
            } else {
                learningEnglish.words.offset = setCount;
            }

            this.getWords(learningEnglish)
                .then(function (response) {

                    let data = response.concat(learningEnglish.words.dontKnow);

                    this.setState({
                        words: data,
                        currentWord: 0,
                        answer: 0,
                        offset: learningEnglish.words.offset
                    });
                    
                    learningEnglish.words.dontKnow = data;
                    Local.setData(learningEnglish);

                }.bind(this))
                .catch(function (data) {

                    this.setState({
                        words: data,
                        offset: learningEnglish.words.offset
                    });

                }.bind(this));;

        } else {
            this.setState({
                currentWord: currentWord,
                answer: 0
            });
        }

    };


    handleAnswer = () => {
        this.setState({
            answer: 1
        });
    };


    getWords = (local = {}) => {

        return new Promise(function (resolve, reject) {

            const limit = setCount - local.words.dontKnow.length;

            if (limit) {

                let url = myUrl.setParams(Uris.wordsGet, {
                    limit: limit,
                    offset: local.words.offset
                });

                Data.get(url)
                    .then((response) => {

                        resolve(response);

                    });
            } else {

                reject(local.words.dontKnow);
            }

        });
    };


    render() {

        const word = this.state.words[this.state.currentWord];

        const compQuiz = (
            <Quiz handleChange={this.handleChange} 
                handleIKnow={this.handleIKnow} 
                handleAnswer={this.handleAnswer} 
                value={this.state.value} 
                word={word} />
        );

        const compAnswer = <Answer handleNext={this.handleNext} word={word} />;


        return (
            <div>
                <App />
                <div className="main">
                    <div className="card item MH-180" >
                        <span className="word-id">{word.id}</span>
                        <span className="index">{this.state.currentWord + 1}</span>

                        {this.state.answer ? compAnswer : compQuiz}
                    </div>
                    <div className="M-10">
                        <p>Level: {word.level}</p>
                        <p>Set's count: {setCount}</p>
                    </div>
                </div>
            </div>
        );
    }


    componentDidMount() {

        let learningEnglish = Local.getData();

        this.getWords(learningEnglish)
            .then(function (response) {
                
                let data = response.concat(learningEnglish.words.dontKnow);
                learningEnglish.words.dontKnow = data;

                this.setState({
                    words: data,
                    offset: learningEnglish.words.offset
                });

                Local.setData(learningEnglish);

            }.bind(this))
            .catch(function(data) {

                this.setState({
                    words: data,
                    offset: learningEnglish.words.offset
                });

            }.bind(this));
    }

}

export default LearnWords;