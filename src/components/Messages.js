import React from 'react';

function Messages(props) {

    const renderMessage = (message, index) => {

        const {member, text} = message;

        const className = member.id === props.currentMember.id
            ? "messages-message current-member"
            : "messages-message";

        return (
            <li className={className} key={index}>
                <div className="message-content">
                    <div className="username">
                        {member.clientData.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }

    return (
        <ul className="messages-list">
            { props.messages.map((m, i) => renderMessage(m, i)) }
        </ul>
    );

}

export default Messages;