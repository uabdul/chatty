import React, {Component} from 'react';

class ChatBar extends Component {

  render() {

    const username = this.props.currentUser.name

    const handleEnter = (event) => {
      if (event.key === 'Enter') {
        const messageInput = event.target.value;
        this.props.addNewMessage(messageInput)
      }
    }

    return (
      <footer className="chatbar">
        <input
          defaultValue={username}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={handleEnter}
        />
      </footer>
    );


  }

}

export default ChatBar;