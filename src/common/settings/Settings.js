import React from 'react';
import App from '../../App';
import '../common.css';
import ButtonLoader from '../../components/ButtonLoader';


class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reset: 0
        };
    }


    handleReset = () => {
        let learningEnglish = JSON.parse(localStorage.getItem('learningEnglish'));

        learningEnglish.exercises = {};

        localStorage.setItem('learningEnglish', JSON.stringify(learningEnglish));
    };


    render() {

        return (
            <div>
                <App />
                <div className="main">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item li-nav">
                                Exercises 
                                <ButtonLoader func={this.handleReset} text="reset progress" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

export default Settings;