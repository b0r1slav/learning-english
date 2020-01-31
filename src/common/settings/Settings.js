import React from 'react';
import App from '../../App';
import '../common.css';
import ButtonLoader from '../../components/ButtonLoader';
import { Local } from '../Data';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';


class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reset: 0,
            sound: true
        };
    }


    handleResetExercises = () => {
        let learningEnglish = Local.getData();

        learningEnglish.exercises = Local.defaultData.exercises;

        Local.setData(learningEnglish);
    };


    handleResetLearnWords = () => {
        let learningEnglish = Local.getData();

        learningEnglish.words = Local.defaultData.words;

        Local.setData(learningEnglish);
    };


    handleSound = () => {
        let learningEnglish = Local.getData();

        learningEnglish.sound = !learningEnglish.sound;

        Local.setData(learningEnglish);

        this.setState({
            sound: learningEnglish.sound
        });
    };


    handleResetAll = () => {
        
        Local.setData();

    };


    render() {

        return (
            <div>
                <App />
                <div className="main">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item li-nav">
                                Sound
                                <button type="button" className="btn btn-sm btn-outline-primary rounded-circle float-right" onClick={this.handleSound}>
                                    {this.state.sound ? <FaVolumeUp /> : <FaVolumeMute />}
                                </button>
                            </li>
                            <li className="list-group-item li-nav">
                                Exercises
                                <ButtonLoader func={this.handleResetExercises} text="reset progress" />
                            </li>
                            <li className="list-group-item li-nav">
                                Learn Words
                                <ButtonLoader func={this.handleResetLearnWords} text="reset progress" />
                            </li>
                            <li className="list-group-item li-nav">
                                <div className="row">
                                    <div className="col-sm-6">
                                        Reset all progress and settings!
                                    </div>
                                    <div className="col-sm-6">
                                        <ButtonLoader func={this.handleResetAll} text="hard reset" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }


    componentDidMount() {
        const learningEnglish = Local.getData();

        this.setState({
            sound: learningEnglish.sound
        });
    }

}

export default Settings;