import React from 'react';
import App from '../App';
import { Data } from '../common/Data';


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

        Data.get(`search/exercises?value=${search.replace(/\s+/g, '+')}`)
            .then((response) => {
                this.setState({
                    response: response,
                });
            });
    };


    render() {

        let list = this.state.response.data.map(function(item, index) {
            return (
                <div key={index} className="card item P-10">
                    <p>{item.en}</p>
                    <p>{item.bg}</p>
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
                                    placeholder="Please enter at least 3 characters to search" />
                        </div>
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

        if (this.state.value !== prevState.value && (this.state.value.length > 2 || this.state.value.length < 1) ) {

            this.getExpressions(this.state.value);
        }

    }
}

export default Expressions;