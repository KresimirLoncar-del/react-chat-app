import React, { Component } from 'react';
import './App.css';

import Messages from "./components/Messages";
import Input from "./components/Input";

function randomUsername() {

    const usernames = [
        "optimusprime", "asteroid73", "snake42", "lavaplanet22", "thelionking", "stone06", "thegodfather75",
        "donut4826", "coffee08", "blackeye87", "sparrow1988", "saxophone", "snowstorm", "flyinginsect45"
    ];

    return usernames[Math.floor(Math.random() * usernames.length)];
}

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            messages: [],
            member: {
                username: randomUsername()
            },
            drone: null
        }
    }

    componentDidMount() {

        const drone = new window.Scaledrone("2SXc4Pxb8YCJbclJ", {
            data: this.state.member
        });

        this.setState({drone: drone});

        drone.on('open', error => {
            if (error) {
                return console.error(error);
            }

            const member = {...this.state.member};
            member.id = drone.clientId;

            this.setState({member});
        });

        const room = drone.subscribe("observable-chat-room");

        room.on('data', (text, member) => {

            const messages = [...this.state.messages];
            messages.push({
                member: member,
                text: text
            });

            this.setState({messages: messages});
        });
    }

    onSendMessage = (message) => {
        this.state.drone.publish({
            room: "observable-chat-room",
            message
        });
    }

    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <h1>My Chat App</h1>
                </div>
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input
                    onSendMessage={this.onSendMessage}
                />
            </div>
        );
    }
}

export default App;
