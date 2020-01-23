import React from 'react';
import { Data } from './Data';
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
        let mp3Name = event.currentTarget.dataset.word.trim().toLowerCase().replace(/[^a-zA-Z]+/, '_');
        let audio = new Audio(`https://b0r1slav.github.io/pronunciation/mp3/${mp3Name}.mp3`);

        audio.play();

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
                                <input type="search" className="form-control rounded-0" value={this.state.value} onChange={this.handleChange} />
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

        if (this.state.value !== prevState.value) {
            Data.get(`search/words?value=${this.state.value}`)
            .then((response) => {
                this.setState({
                    words: response.data
                });
            });
        }
        
    }

}

export default ModalDictionary;