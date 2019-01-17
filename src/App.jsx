import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import messageData from './messageData.json'
import uuid from 'uuid/v4';
const id = uuid();

class App extends Component {

  constructor() {
    super();
    this.state = {
      userCount: 0,
      currentUser: {name: "Anonymous"},
      messages: []
    };
    this.addNewMessage = this.addNewMessage.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = (event) => {
      console.log("Connected to WS server")
    }

    this.socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);

      if (receivedMessage.type == "incomingUserUpdate") {
        console.log('new user', receivedMessage.content)
        this.setState({
          userCount: parseInt(receivedMessage.content)
        })
      } else if (receivedMessage.type == "userColour") {
        this.setState({
          colour: receivedMessage.colour
        })
      } else {
        const oldMessages = this.state.messages;
        const newMessages = [...oldMessages, receivedMessage];
        this.setState({
          messages: newMessages
        })
      }
    }
  }

  addNewMessage(message) {
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/

    if (regex.test(message)) {
      const newImage = {
        type: "postImage",
        username: this.state.currentUser.name,
        colour: this.state.colour,
        content: message
      }
      this.socket.send(JSON.stringify(newImage))
    } else {
      const newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        colour: this.state.colour,
        content: message
      }
      this.socket.send(JSON.stringify(newMessage))
    }
    
  }

  changeUsername(user) {
    const oldUsername = this.state.currentUser.name;
    this.setState({
      currentUser: {name: user}
    });

    const newNotification = {
      type: "postNotification",
      username: this.state.currentUser.name,
      content: `${oldUsername} changed their name to ${user}.`
    }
    this.socket.send(JSON.stringify(newNotification))
  }


  render() {
    return (
      <div>
        <NavBar userCount = {this.state.userCount} />
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser = {this.state.currentUser} addNewMessage = {this.addNewMessage} changeUsername = {this.changeUsername} />
      </div>
    );
  }
}
export default App;
