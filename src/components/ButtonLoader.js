import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import './ButtonLoader.css'


const ButtonLoader = (props) => {
    const [click, setClick] = useState(0);
    const loader = <span><FaSpinner className="i-spin loader" /><span className="btn-text">{props.text}</span></span>;
    const content = click ? loader : props.text;

    const handleClick = (event) => {
        event.currentTarget.blur();

        props.func();

        setClick(1);

        setInterval(function(){
            setClick()
        }, 1000);
    };

    return (
        <button onClick={handleClick} type="button" id="button-loader" className="btn btn-sm btn-outline-primary float-right position-relative">
            {content}
        </button>
    );
};

export default ButtonLoader;