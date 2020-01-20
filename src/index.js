import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';

ReactDOM.render(
    (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes />
        </Router>
    ),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
