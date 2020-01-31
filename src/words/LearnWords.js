import React from 'react';
import App from '../App';
import { Data, Uris, Local } from '../common/Data';
import { myUrl, playMp3 } from '../common/helpers';
import './LearnWords.css';
import Answer from './Answer';
import Quiz from './Quiz';


const setCount = 9;
const deafultWord = {id:0,bg:'----',en:'----',level:'--'};


class LearnWords extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            words: [],
            currentWord: 0,
            value: '',
            answer: 0,
            know: 0,
            lastLimit: 0,
            dontKnow: []
        };
    }


    handleChange = (event, word) => {
        const value = event.currentTarget.value.trim().toLowerCase();

        this.setState({
            value: event.currentTarget.value
        });


        if (value === word.en.trim().toLowerCase()) {
            this.handleIKnow(word);
        }

    };


    handleIKnow = (word) => {
        let { currentWord, know, dontKnow, lastLimit } = this.state;
        let learningEnglish = Local.getData();


        playMp3(word.en);

        const dontKnowFilter = dontKnow.filter(item => item.id !== word.id);

        currentWord++;

        know++;

        if (currentWord === setCount) {

            learningEnglish.words.dontKnow = dontKnowFilter;
            learningEnglish.words.offset += lastLimit;

            this.getWords(learningEnglish)
                .then(function (response) {

                    let data = response.data.concat(response.local.words.dontKnow)

                    this.setState({
                        words: data,
                        currentWord: 0,
                        value: '',
                        dontKnow: data,
                        know: know,
                        lastLimit: response.local.words.limit
                    });

                    response.local.words.dontKnow = data;
                    response.local.words.know = know;

                    Local.setData(response.local);

                }.bind(this));

        } else {
            this.setState({
                currentWord: currentWord,
                value: '',
                know: know,
                dontKnow: dontKnowFilter
            });
        }

    };


    handleNext = () => {
        let { currentWord, know, dontKnow, lastLimit } = this.state;
        let learningEnglish = Local.getData();

        currentWord++;

        if (currentWord === setCount) {

            learningEnglish.words.dontKnow = dontKnow;
            learningEnglish.words.offset += lastLimit;

            this.getWords(learningEnglish)
                .then(function (response) {

                    let data = response.data.concat(response.local.words.dontKnow);

                    response.local.words.dontKnow = data;
                    response.local.words.know = know;


                    this.setState({
                        words: data,
                        currentWord: 0,
                        answer: 0,
                        value: '',
                        know: response.local.words.know,
                        dontKnow: data,
                        lastLimit: response.local.words.limit
                    });

                    Local.setData(response.local);

                }.bind(this))
                .catch(function (data) {

                    this.setState({
                        words: data,
                        value: '',
                        know: know
                    });

                }.bind(this));;

        } else {
            this.setState({
                currentWord: currentWord,
                value: '',
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

                        local.words.limit = limit;

                        resolve({data: response, local: local});

                    });
            } else {

                reject(local.words.dontKnow);
            }

        });
    };


    render() {

        const word = this.state.words[this.state.currentWord] || deafultWord;

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
                        <p>Know: {this.state.know}</p>
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
                
                let data = response.data.concat(response.local.words.dontKnow);
                response.local.words.dontKnow = data;

                this.setState({
                    words: data,
                    know: response.local.words.know,
                    lastLimit: response.local.words.limit,
                    dontKnow: data
                });

                Local.setData(response.local);

            }.bind(this))
            .catch(function(data) {

                this.setState({
                    words: data,
                    know: learningEnglish.words.know,
                    dontKnow: data,
                    lastLimit: learningEnglish.words.limit
                });

            }.bind(this));
    }

}

export default LearnWords;