import React, { Component } from 'react';

class Input extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

    onChange = (e) => {
        this.setState({message: e.target.value});
    }

    onClick = (e) => {
        e.preventDefault();
        this.send();
    }

    onEnterPress = (e) => {
        if (e.charCode === 13) {
            this.send();
        }
    }

    send = () => {
        this.props.onSendMessage(this.state.message);
        this.setState({message: ''});
    }

    render() {
        return (
            <div className="form-control">
                <input
                    onChange={this.onChange}
                    onKeyPress={this.onEnterPress}
                    value={this.state.message}
                    type="text"
                    placeholder="Enter your message and press ENTER"
                />
                <button onClick={this.onClick}>SEND</button>
            </div>
        );
    }
}

export default Input;