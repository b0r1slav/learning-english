import React from 'react';
import './App.css';
import Navigation from './common/navigation/Navigation';
import Sidebar from './common/sidebar/Sidebar';
import { Local } from './common/Data';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            styles: {
                sidebar: { width: 0 }
            }
        };

        this.openSidebar = this.openSidebar.bind(this);
        this.closeSidebar = this.closeSidebar.bind(this);
    }


    openSidebar() {
        this.setState({
            styles: {
                sidebar: { width: '250px' }
            }
        });
    }


    closeSidebar() {
        this.setState({
            styles: {
                sidebar: { width: 0 }
            }
        });
    }


    render() {

        return (
            <div>
                <Sidebar styles={this.state.styles} closeSidebar={this.closeSidebar} />
                <Navigation openSidebar={this.openSidebar} />
            </div>
        );
    }


    componentDidMount() {

        if( ! Local.getData() ) {
            Local.setData();
        }
    }
}


export default App;
