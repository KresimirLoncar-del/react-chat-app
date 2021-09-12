import React, { Component } from 'react';

class Messages extends Component {

    renderMessage(message) {

        const {member, text} = message;

        const className = member.id === this.props.currentMember.id
            ? "messages-message current-member"
            : "messages-message";

        return (
            <li className={className}>
                <div className="message-content">
                    <div className="username">
                        {member.clientData.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }

    render() {
        return (
            <ul className="messages-list">
                { this.props.messages.map(m => this.renderMessage(m)) }
            </ul>
        );
    }
}

export default Messages;