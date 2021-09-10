import React, { Component } from 'react';
import './App.css';

import Messages from "./components/Messages";
import Input from "./components/Input";

function randomName() {

    const names = [
        "Ivan", "Marko", "Luka", "Matej", "Tena", "Josipa", "Mihael", "Mihaela",
        "Valentina", "Petar", "Jelena", "Toni", "Matea", "Karlo", "Klara", "Tea"
    ];

    const surnames = [
        "Horvat", "Marković", "Ćurić", "Perić", "Jurić", "Jurakić", "Petraš", "Kuleš"
    ];

    const name = names[Math.floor(Math.random() * names.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    return name + " " + surname;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            messages: [],
            member: {
                username: randomName(),
                color: randomColor()
            },
            drone: null
        }
    }

    componentDidMount() {

        const drone = new window.Scaledrone("tHliUu9D8T66vDD1", {
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

        room.on('open', error => {

            if (error) {
                return console.error(error);
            }

            this.setState({messages: room._history.messages});
        });

        room.on('data', (text, member) => {

            console.log("Message -->", text)
            console.log("Member -->", member)

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

        console.log("Get messages -->", this.state.messages);

        return (
            <div className="App">
                <div className="App-header">
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
