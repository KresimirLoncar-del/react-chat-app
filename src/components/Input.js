import React, { useState } from 'react';

function Input(props) {

    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onClick = (e) => {
        e.preventDefault();
        send();
    }

    const onEnterPress = (e) => {
        if (e.charCode === 13) {
            send();
        }
    }

    const send = () => {
        if(message) {
            props.onSendMessage(message);
            setMessage('');
        }
    }

    return (
        <div className="form-control">
            <input
                onChange={onChange}
                onKeyPress={onEnterPress}
                value={message}
                type="text"
                placeholder="Enter your message and press ENTER"
            />
            <button onClick={onClick}>SEND</button>
        </div>
    );
}

export default Input;