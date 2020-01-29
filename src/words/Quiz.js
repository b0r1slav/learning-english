import React from 'react';


const Quiz = (props) => {
    
    return (
        <div className="card-body">
            <p>{props.word.bg}</p>
            <div className="M-B15">
                <input type="text"
                    className="form-control rounded-0"
                    placeholder="Your answer..."
                    value={props.value}
                    onChange={(event) => props.handleChange(event, props.word)} />
            </div>
            <div>
                <button type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => props.handleIKnow(props.word)}>
                    I know
                    </button>
                <button type="button"
                    className="btn btn-primary btn-sm float-right"
                    onClick={props.handleAnswer}>
                    Answer
                    </button>
            </div>
        </div>
    );
};

export default Quiz;