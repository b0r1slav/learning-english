import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import ModalDictionary from '../ModalDictionary';
import './Sidebar.css';


class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            styles: {
                display: 'none'
            }
        }
    }


    handleDictionary = () => {

        const display = this.state.styles.display === 'none' ? 'block' : 'none';

        this.setState({
            styles: {
                display: display
            }
        });
    };


    render() {

        return (
            <div style={this.props.styles.sidebar} onClick={this.props.closeSidebar} className="sidebar">
                <button className="btnClose"><IoIosArrowBack /></button>
                <div className="sidebarContainer">
                    <Link to="/exercises">Exercises</Link>
                    <button type="button" className="link" onClick={this.handleDictionary}>Dictionary</button>
                    <Link to="/settings">Settings</Link>
                </div>
                <ModalDictionary styles={this.state.styles} handleDictionary={this.handleDictionary} />
            </div>
        );
    }
}

export default Sidebar;