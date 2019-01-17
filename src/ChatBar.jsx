import React, {Component} from 'react';

class ChatBar extends Component {

  render() {

    const username = this.props.currentUser.name

    const handleMessageEnter = (event) => {
      if (event.key === 'Enter') {
        const messageInput = event.target.value;

        if (!messageInput) {
          alert('Please enter a message.')
        } else {
          this.props.addNewMessage(messageInput)
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
          onKeyPress={handleMessageEnter}
        />
      </footer>
    );


  }

}

export default ChatBar;