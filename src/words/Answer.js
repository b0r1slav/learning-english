import React, { useEffect } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { playMp3 } from '../common/helpers';


const handlePlay = (event) => {

    playMp3(event.currentTarget.dataset.word);

};


const Answer = (props) => {


    useEffect(() => {
        playMp3(props.word.en);
    });


    return (
        <div className="card-body">
            <p>{props.word.en}</p>
            <div>
                <button type="button" className="text-primary pronons M-T10 M-B15" data-word={props.word.en} onClick={handlePlay}>
                    <FaVolumeUp />
                </button>
            </div>
            <button type="button"
                className="btn btn-primary btn-sm float-right"
                onClick={props.handleNext}>
                Next
            </button>
        </div>
    );
}

export default Answer;