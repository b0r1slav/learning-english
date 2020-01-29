import React from 'react';
import { Data, Uris } from './Data';
import { playMp3 } from './helpers';
import { FaVolumeUp } from 'react-icons/fa';


class ModalDictionary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            words: [],
        }
    }


    handleChange = (event) => {

        this.setState({
            value: event.currentTarget.value
        });
    };


    handlePlay = (event) => {

        playMp3(event.currentTarget.dataset.word);

    };


    render() {

        const list = this.state.words.map(function(item, index) {
            return (
                <p key={index}>
                    <button type="button" className="text-primary pronons" data-word={item.en} onClick={this.handlePlay}>
                        <FaVolumeUp /> 
                    </button> 
                    {item.en} - {item.bg} 
                </p>
            );
        }, this);

        return (
            <div style={this.props.styles} className="modal bootstrap-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title">Dictionary A1 - C1</h6>
                            <button type="button" className="close" onClick={this.props.handleDictionary}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body P-5">
                            <div className="input-group M-B10">
                                <input type="search" 
                                    className="form-control rounded-0" 
                                    value={this.state.value} 
                                    onChange={this.handleChange} 
                                    placeholder="Enter word ..." />
                            </div>

                            <div className="search-response">
                                {list}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" onClick={this.props.handleDictionary}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    componentDidUpdate(prevProps, prevState) {

        const value = this.state.value.trim();

        if (value !== prevState.value.trim()) {
            Data.get(`${Uris.wordsSearch}?value=${value}`)
            .then((response) => {
                this.setState({
                    words: response.data
                });
            });
        }
        
    }

}

export default ModalDictionary;