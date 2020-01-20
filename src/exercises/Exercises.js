import React from 'react';
import App from '../App';
import { Data, Local } from '../common/Data';
import '../common/common.css';


class Exercises extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            exercises: [],
            answered: []
        };
    }


    handleAnswer = (event) => {
        const { lesson } = this.props.match.params;
        const { id } = event.currentTarget.dataset;
        let learningEnglish = Local.getItem('learningEnglish');
        let exercises = learningEnglish.exercises[`lesson${lesson}`];

        if (exercises.indexOf(id) < 0) {
            exercises.push(id);
        }

        Local.setItem('learningEnglish', learningEnglish);
    };

    handleBlur = (event) => {
        const { id } = event.currentTarget.dataset;
        let { answered } = this.state;

        if (answered.indexOf(id) < 0) {
            answered.push(+id);

            this.setState({
                answered: answered
            });
        }

    };


    render() {

        const { exercises, answered } = this.state;

        let list = exercises.map(function (exercise, index) {

            let classAnswered = answered.indexOf(exercise.id) > -1 ? 'text-secondary' : '';

            return (
                <div key={index} className={`card item ${classAnswered}`} >
                    <div className="card-body">
                        <p>{index+1}. {exercise.bg}</p>
                        <textarea className="form-control" rows="2" placeholder="Your answer"></textarea>
                        <details>
                            <summary className="answer" data-id={exercise.id} onClick={this.handleAnswer} onBlur={this.handleBlur}>Compare</summary>
                            <p>{ exercise.en }</p>
                        </details>
                    </div>
                </div>
            );
        }, this);


        return (
            <div>
                <App />
                <div className="main">
                    { list }
                </div>
            </div>
        );
    }


    componentDidMount() {

        Data.get(`exercises/200/${this.props.match.params.lesson}`)
            .then((response) => {

                let local = Local.getItem('learningEnglish');

                this.setState({
                    data: response,
                    exercises: response.data,
                    answered: local.exercises[`lesson${this.props.match.params.lesson}`].map(Number)
                });
            });
    }

}

export default Exercises;