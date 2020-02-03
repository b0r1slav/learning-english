import React from 'react';
import App from '../App';
import { Data, Uris, Local, Levels } from '../common/Data';
import { myUrl, playMp3 } from '../common/helpers';
import './LearnWords.css';
import Answer from './Answer';
import Quiz from './Quiz';
import Completed from './Completed';


const setCount = 9;
const deafultWord = {id:0,bg:'----',en:'----',level:'--'};


class LearnWords extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            words: [],
            currentWord: 0,
            value: '',
            currentComponent: 0,
            know: 0,
            lastLimit: 0,
            dontKnow: [],
            level: 'A1',
            wrong: 0
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
        let { currentWord, know, dontKnow, lastLimit, level, wrong } = this.state;
        let localS = Local.getData();
        let learningEnglish = localS.words.levels[level];

        playMp3(word.en);

        const dontKnowFilter = dontKnow.filter(item => item.id !== word.id);

        currentWord++;

        know++;

        if (currentWord === setCount) {

            learningEnglish.dontKnow = dontKnowFilter;
            learningEnglish.offset += lastLimit;

            this.getWords(learningEnglish, level)
                .then(function (response) {

                    let data = response.data.concat(response.local.dontKnow)

                    this.setState({
                        words: data,
                        currentWord: 0,
                        value: '',
                        dontKnow: data,
                        know: know,
                        lastLimit: response.local.limit,
                        wrong: wrong
                    });

                    learningEnglish = response.local;

                    learningEnglish.dontKnow = data;
                    learningEnglish.know = know;
                    learningEnglish.wrong = wrong;

                    Local.setData(localS);

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
        let { currentWord, know, dontKnow, lastLimit, level, wrong } = this.state;
        let localS = Local.getData();
        let learningEnglish = localS.words.levels[level];

        currentWord++;
        wrong++;

        if (currentWord === setCount) {

            learningEnglish.dontKnow = dontKnow;
            learningEnglish.offset += lastLimit;

            this.getWords(learningEnglish, level)
                .then(function (response) {

                    let data = response.data.concat(response.local.dontKnow);

                    response.local.dontKnow = data;
                    response.local.know = know;
                    response.local.wrong = wrong;


                    this.setState({
                        words: data,
                        currentWord: 0,
                        currentComponent: 0,
                        value: '',
                        know: response.local.know,
                        dontKnow: data,
                        lastLimit: response.local.limit,
                        wrong: wrong,
                    });

                    learningEnglish = response.local;

                    Local.setData(localS);

                }.bind(this))
                .catch(function (data) {

                    this.setState({
                        words: data,
                        value: '',
                        know: know,
                        wrong: wrong
                    });

                }.bind(this));;

        } else {
            this.setState({
                currentWord: currentWord,
                value: '',
                currentComponent: 0,
                wrong: wrong
            });
        }

    };


    handleAnswer = () => {
        this.setState({
            currentComponent: 1
        });
    };


    getWords = (local = {}, level=null) => {

        return new Promise(function (resolve, reject) {

            const limit = setCount - local.dontKnow.length;

            if (limit) {

                let url = myUrl.setParams(Uris.wordsGet, {
                    limit: limit,
                    offset: local.offset,
                    level: level
                });

                Data.get(url)
                    .then((response) => {

                        local.limit = limit;

                        resolve({data: response, local: local});

                    });
            } else {

                reject(local.dontKnow);
            }

        });
    };


    handleLevel = (level) => {
        const local = Local.getData();
        
        level = level || local.words.currentLevel;

        this.getWords(local.words.levels[level], level)
            .then(function (response) {

                let data = response.data.concat(response.local.dontKnow);
                response.local.dontKnow = data;

                this.setState({
                    words: data,
                    know: response.local.know,
                    lastLimit: response.local.limit,
                    dontKnow: data,
                    level: level,
                    wrong: response.local.wrong
                });

                local.words.levels[level] = response.local;
                local.words.currentLevel = level;

                Local.setData(local);

            }.bind(this))
            .catch(function (data) {

                this.setState({
                    words: data,
                    know: local.words.levels[level].know,
                    dontKnow: data,
                    lastLimit: local.words.levels[level].limit,
                    level: level,
                    wrong: local.words.levels[level].wrong
                });

            }.bind(this));
    };


    handleChangeLevel = (event) => {

        this.handleLevel(event.currentTarget.value.trim());

    };


    render() {

        const word = this.state.words[this.state.currentWord] || deafultWord;
        const { level, currentComponent } = this.state;
        const comp = this.state.words.length ? currentComponent : 2;
        const levels = Levels.map(function(title, index) {
            return <option key={index} value={title} >{title}</option>
        });

        const components = [
            (
                <Quiz handleChange={this.handleChange}
                    handleIKnow={this.handleIKnow}
                    handleAnswer={this.handleAnswer}
                    value={this.state.value}
                    word={word} />
            ),
            (
                <Answer handleNext={this.handleNext} word={word} />
            ),
            (
                <Completed />
            )
        ];


        return (
            <div>
                <App />
                <div className="main">
                    <div className="card item MH-180" >
                        <span className="word-id">{word.id}</span>
                        <span className="index">{this.state.currentWord + 1}</span>

                        {components[comp]}
                    </div>
                    <div className="M-10">
                        <p>Know: {this.state.know}</p>
                        <p>Wrong: {this.state.wrong}</p>
                        <p>Set's count: {setCount}</p>
                    </div>
                    <div className="P-10">
                        <span>Level: </span>
                        <select className="select-level" value={level} onChange={this.handleChangeLevel}>
                            {levels}
                        </select>
                    </div>
                </div>
            </div>
        );
    }


    componentDidMount() {

        this.handleLevel();

    }

}

export default LearnWords;