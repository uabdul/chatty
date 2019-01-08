import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import messageData from './messageData.json'
import uuid from 'uuid/v4';
const id = uuid();

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: messageData.currentUser,
      messages: messageData.messages
    };
    this.addNewMessage = this.addNewMessage.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addNewMessage(message) {
    const id = uuid();
    const newMessage = {
      id,
      username: this.state.currentUser.name,
      content: message
    }
    const oldMessages = this.state.messages
    const newMessages = [...oldMessages, newMessage];
    this.setState({
      currentUser: messageData.currentUser,
      messages: newMessages
    })
  }


  render() {
    return (
      <div>
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser = {this.state.currentUser} addNewMessage = {this.addNewMessage} />
      </div>
    );
  }
}
export default App;
