import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();

    this.state = {
      text: ''
    }
  }

  render() {

    const username = this.props.currentUser.name

    const handleMessageEnter = (event) => {
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

    const handleUserEnter = (event) => {
      if (event.key === 'Enter') {
        const userInput = event.target.value;
        if (!userInput) {
          alert('Please enter a valid new username.')
        } else {
          this.props.changeUsername(userInput)
        }
      }
    }

    const handleContent = (event) => {
      this.setState({
        text: event.target.value
      })
    }

    return (
      <footer className="chatbar">
        <input
          defaultValue={username}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyPress={handleUserEnter}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.text}
          onChange={handleContent}
          onKeyPress={handleMessageEnter}
        />
      </footer>
    );


  }

}

export default ChatBar;