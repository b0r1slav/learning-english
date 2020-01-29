import React from 'react';
import App from '../App';
import { Data, Uris } from '../common/Data';


class Expressions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            response: {
                data: []
            },
            value: ''
        };
    }


    handleChange = (event) => {

        this.setState({
            value: event.currentTarget.value
        });
    };


    getExpressions = (search='') => {

        Data.get(`${Uris.exrcisesSearch}?value=${search.replace(/\s+/g, '+')}`)
            .then((response) => {
                this.setState({
                    response: response,
                });
            });
    };


    render() {

        const test = /^[a-zA-Z]+/.test(this.state.value.trim());
        const sorting = test ? ['en', 'bg'] : ['bg', 'en'];

        let list = this.state.response.data.map(function(item, index) {
            return (
                <div key={index} className="card item P-10">
                    <p>{item[ sorting[0] ]}</p>
                    <p>{item[ sorting[1] ]}</p>
                </div>
            );
        });

        return (
            <div>
                <App />
                <div className="main">
                    <div className="card item P-10">
                        <div className="input-group">
                            <input  type="search" 
                                className="form-control rounded-0" 
                                value={this.state.value} 
                                onChange={this.handleChange} 
                                aria-describedby="expressionHelp"
                                placeholder="Search..." />
                        </div>
                        <small id="expressionHelp" className="form-text text-muted">Please enter at least 3 characters to search</small>
                    </div>
                    {list}
                </div>
            </div>
        );
    }


    componentDidMount() {

        this.getExpressions();
    }


    componentDidUpdate(prevProps, prevState) {

        const value = this.state.value.trim();

        if (value !== prevState.value.trim() && (value.length > 2 || value.length < 1) ) {

            this.getExpressions(value);
        }

    }
}

export default Expressions;