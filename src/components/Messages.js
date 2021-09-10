import React, { Component } from 'react';

class Messages extends Component {

    renderMessage(message) {

        const {member, text} = message;

        const className = member.id === this.props.currentMember.id
            ? "Messages-message currentMember"
            : "Messages-message";

        return (
            <li className={className}>
                <div className="Message-content">
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
            <ul className="Messages-list">
                { this.props.messages.map(m => this.renderMessage(m)) }
            </ul>
        );
    }
}

export default Messages;