import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();

    this.state = {
      text: ''
    };

    this.handleMessageEnter = this.handleMessageEnter.bind(this)
  }

  render() {

    const username = this.props.currentUser.name

    return (
      <footer className="chatbar">
        <input
          defaultValue={username}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyPress={this.handleUserEnter}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.text}
          onChange={this.handleContent}
          onKeyPress={this.handleMessageEnter}
        />
      </footer>
    );
  };

  // validation on message enter 
  handleMessageEnter = (event) => {
    if (event.key === 'Enter') {
      const messageInput = this.state.text;
      if (!messageInput) {
        alert('Please enter a message.')
      } else {
        this.props.addNewMessage(messageInput);
        this.setState({
          text: ''
        })
      }
    }
  }

  //validation on username enter
  handleUserEnter = (event) => {
    if (event.key === 'Enter') {
      const userInput = event.target.value;
      if (!userInput) {
        alert('Please enter a valid new username.')
      } else {
        this.props.changeUsername(userInput)
      }
    }
  }

  // updates state on change to text input field
  handleContent = (event) => {
    this.setState({
      text: event.target.value
    })
  }

}

export default ChatBar;