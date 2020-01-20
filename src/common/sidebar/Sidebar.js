import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './Sidebar.css';


const Sidebar = (props) => {

    return (
        <div style={props.styles.sidebar} onClick={props.closeSidebar} className="sidebar">
            <button className="btnClose"><IoIosArrowBack /></button>
            <div className="sidebarContainer">
                <Link to="/exercises">Exercises</Link>
                <Link to="/settings">Settings</Link>
            </div>
        </div>
    );
};

export default Sidebar;