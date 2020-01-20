import React from 'react';
import { IoIosMenu } from 'react-icons/io';
import './Navigation.css';

const Navigation = (props) => {

    return (
        <div className="navigation">
            <button onClick={props.openSidebar} className="btnMenu"><IoIosMenu /></button>
        </div>
    );
};

export default Navigation;