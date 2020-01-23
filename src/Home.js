import React from 'react';
import App from './App';
import { Link } from 'react-router-dom';
import './common/common.css';


const items = [
    {
        uri: '/exercises',
        title: 'Exercises'
    },
    {
        uri: '/settings',
        title: 'Settings'
    }
];


class Home extends React.Component {

    render() {

        const list = items.map(function (item, index) {
            return (
                <div key={index} className="col-sm-4 col-6 P-5">
                    <Link to={item.uri}>
                        <div className="card">
                            <div className="card-body home-item">
                                {item.title}
                            </div>
                        </div>
                    </Link>
                </div>
            );
        });

        return (
            <div>
                <App />
                <div className="main">
                    <div className="row M-0">
                        {list}
                    </div>
                </div>
            </div>
        );
    }


}

export default Home;