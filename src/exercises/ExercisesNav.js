import React from 'react';
import App from '../App';
import { IoIosArrowForward } from 'react-icons/io';
import { Data, Local } from '../common/Data';
import { Link } from 'react-router-dom';


class ExercisesNav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lessons: []
        };
    }


    handleLocal = (response) => {

        let learningEnglish = Local.getItem('learningEnglish');
        const exercisesLength = Object.keys(learningEnglish.exercises).length;

        if (!exercisesLength || exercisesLength !== response.length) {

            response.forEach(element => {
                if (!learningEnglish.exercises['lesson' + element.id]) {
                    learningEnglish.exercises['lesson' + element.id] = [];
                }
            });

            Local.setItem('learningEnglish', learningEnglish);
        }

    };


    render() {

        const {exercises} = Local.getItem('learningEnglish');

        this.state.lessons.sort(function(a, b) {

            if (a.id === 18) return 1;
            if (b.id === 18) return -1;

            return a.id - b.id;

        });


        let list = this.state.lessons.map(function (lesson, index) {
            return (
                <li key={index} className="list-group-item li-nav">
                    <Link to={`/exercises/${lesson.id}`} className="nav-item">
                        {lesson.title}
                        <span className="itemRight">
                            <span className="text-success">
                                {exercises[`lesson${lesson.id}`].length}
                            </span>
                            /{lesson.exercises_count} &nbsp;
                            <IoIosArrowForward />
                        </span>
                    </Link>
                </li>
            );
        });


        return (
            <div>
                <App />
                <div className="main">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            {list}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }


    componentDidMount() {

        Data.get('lessons')
        .then((response) => {

            this.handleLocal(response);

            return response;

        })
        .then((response) => {

            this.setState({
                lessons: response
            });

        });
    }

}

export default ExercisesNav;